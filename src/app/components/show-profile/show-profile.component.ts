import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from 'app/core/services/comment.service';
import { FollowerService } from 'app/core/services/follower.service';
import { PostLikeService } from 'app/core/services/post-like.service';
import { PostService } from 'app/core/services/post.service';
import { ProfileService } from 'app/core/services/profile.service';
import { UserService } from 'app/core/services/user.service';
import { ProfilePost } from 'app/models/profile-post.model';
import { Profile } from 'app/models/profile.model';
import { SessionUser } from 'app/models/session-user.model';
import { ErrorResponse, handleError } from 'app/shared/utils/error';
import { Observable, Subscription, catchError, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.scss']
})
export class ShowProfileComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();
  public readonly currentUser$: Observable<SessionUser | undefined> = this.userService.currentUser$;
  public isCurrentUserProfile$!: Observable<boolean>;
  public isFollowing$!: Observable<boolean>;
  public profile: Profile | undefined;
  public profilePictureUrl: string | undefined;
  public posts: ProfilePost[] = [];

  constructor(
    private readonly profileService: ProfileService,
    private readonly postService: PostService,
    private readonly userService: UserService,
    private readonly postLikeService: PostLikeService,
    private readonly commentService: CommentService,
    private readonly followerService: FollowerService,
    private activatedRoute: ActivatedRoute,
    public readonly router: Router
  ) {}

  ngOnInit(): void {
    this.sub.add(
      this.activatedRoute.params.subscribe((params) => {
        console.log(params);
        this.getProfile(params['userId']);
      })
    );
    this.sub.add(
      this.activatedRoute.params.subscribe((params) => {
        this.getPosts(params['userId']);
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private getProfile(userId: string): void {
    this.sub.add(
      this.profileService
        .getProfile(userId)
        .pipe(handleError())
        .subscribe((response) => {
          this.profile = response.content;
          this.getProfilePicture();

          // Verificăm dacă profilul este profilul utilizatorului curent
          this.isCurrentUserProfile$ = this.isCurrentUser(userId);

          // Verificăm dacă utilizatorul curent urmărește profilul
          this.isFollowing$ = this.isFollowing(userId);
        })
    );
  }

  private getPosts(userId: string): void {
    this.sub.add(
      this.postService
        .getPostsByUser(userId)
        .pipe(handleError())
        .subscribe((response) => {
          this.posts = response.content;

          // Add urls to pictures
          this.posts.forEach((post) => {
            this.sub.add(
              this.postService
                .getPostMedia(post.id)
                .pipe(handleError())
                .subscribe((response) => (post.picturesURLs = response.content?.picturesURLs))
            );
          });

          // Get the number of likes and comments for each post
          this.posts.forEach((post) => {
            this.sub.add(
              this.postLikeService
                .getPostLikesCount(post.id)
                .pipe(handleError())
                .subscribe((response) => (post.likesCount = response.content?.count))
            );
            this.sub.add(
              this.commentService
                .getPostCommentsCount(post.id)
                .pipe(handleError())
                .subscribe((response) => (post.commentsCount = response.content?.count))
            );
          });
        })
    );
  }

  private getProfilePicture(): void {
    if (!this.profile) {
      return;
    }
    const profileId = this.profile.id;
    this.sub.add(
      this.profileService
        .getProfilePicture(profileId)
        .pipe(handleError())
        .subscribe((response) => (this.profilePictureUrl = response.content?.profilePictureURL))
    );
  }

  private isCurrentUser(userId: string): Observable<boolean> {
    return this.userService.whoAmI().pipe(
      map((response) => response.content?.id === userId),
      catchError((err: ErrorResponse) => {
        console.error(err);
        return of(false);
      })
    );
  }

  private isFollowing(userId: string): Observable<boolean> {
    return this.currentUser$.pipe(
      switchMap((user) => {
        if (user) {
          const currentUserId = user.id;
          return this.followerService.getFollowers(userId).pipe(
            map((response) => {
              const followerIds = response.content.map((follower) => follower.followedBy);
              return followerIds.includes(currentUserId);
            }),
            catchError((error: any) => {
              console.error(error);
              return of(false);
            })
          );
        } else {
          return of(false);
        }
      })
    );
  }

  public follow() {
    if (!this.profile) {
      return;
    }
    this.followerService.follow(this.profile.userId).subscribe((response) => {
      this.isFollowing$ = of(true);
    });
  }

  public unfollow() {
    if (!this.profile) {
      return;
    }
    this.followerService.unfollow(this.profile.userId).subscribe((response) => {
      this.isFollowing$ = of(false);
    });
  }

  public openPost(postId: String): void {
    this.router.navigate(['posts', postId]);
  }
}
