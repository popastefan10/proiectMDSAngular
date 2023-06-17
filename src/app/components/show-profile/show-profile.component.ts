import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'app/core/services/post.service';
import { ProfileService } from 'app/core/services/profile.service';
import { UserService } from 'app/core/services/user.service';
import { Post } from 'app/models/post.model';
import { Profile } from 'app/models/profile.model';
import { SessionUser } from 'app/models/session-user.model';
import { Observable, Subscription, map, of } from 'rxjs';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.scss']
})
export class ShowProfileComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();
  public readonly currentUser$: Observable<SessionUser | undefined> = this.userService.currentUser$;
  public isCurrentUserProfile$!: Observable<boolean>;
  public profile: Profile | undefined;
  public profilePictureUrl: string | undefined;
  public posts: Post[] = [];
  public likes: number[] = [];

  constructor(
    private profileService: ProfileService,
    private postService: PostService,
    private readonly userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sub.add(
      this.activatedRoute.params.subscribe((params) => {
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
      this.profileService.getProfile(userId).subscribe((response) => {
        if (response.error) {
          console.log(response.error);
        } else {
          this.profile = response.content;
          this.getProfilePicture();

          // Verificăm dacă profilul este profilul utilizatorului curent
          this.isCurrentUserProfile$ = this.isCurrentUser(userId);
        }
      })
    );
  }

  private getPosts(userId: string): void {
    this.sub.add(
      this.postService.getPostsByUser(userId).subscribe((response) => {
        if (response.error) {
          console.log(response.error);
        } else {
          this.posts = response.content;

          // Add urls to pictures
          this.posts.forEach((post) => {
            this.sub.add(
              this.postService.getPostMedia(post.id).subscribe((response) => {
                if (response.error) {
                  console.log(response.error);
                } else {
                  post.picturesURLs = response.content?.picturesURLs;
                }
              })
            );
          });

          // Get likes for each post
        }
      })
    );
  }

  private getProfilePicture(): void {
    if (!this.profile) {
      return;
    }
    const profileId = this.profile.id;
    this.sub.add(
      this.profileService.getProfilePicture(profileId).subscribe((response) => {
        if (response.error) {
          console.log(response.error);
        } else {
          this.profilePictureUrl = response.content?.profilePictureURL;
        }
      })
    );
  }

  private isCurrentUser(userId: string): Observable<boolean> {
    return this.userService.whoAmI().pipe(
      map(response => {
        if (response.error) {
          console.log(response.error);
          return false;
        } else {
          return response.content?.id === userId;
        }
      })
    );
  }
}
