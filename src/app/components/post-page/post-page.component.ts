import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'app/core/services/comment.service';
import { PostService } from 'app/core/services/post.service';
import { ProfileService } from 'app/core/services/profile.service';
import { Comment } from 'app/models/comment.model';
import { Post } from 'app/models/post.model';
import { Profile } from 'app/models/profile.model';
import { handleError } from 'app/shared/utils/error';
import { SubscriptionCleanup } from 'app/shared/utils/subscription-cleanup';
import {
  BehaviorSubject,
  Observable,
  filter,
  map,
  switchMap,
  takeUntil,
  withLatestFrom
} from 'rxjs';

@Component({
  selector: 'mds-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent extends SubscriptionCleanup {
  private readonly postIdSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public readonly postId$: Observable<string> = this.postIdSubject.asObservable();

  public readonly post$: Observable<Post> = this.postId$.pipe(
    filter((postId) => postId !== ''),
    switchMap((postId) => this.postService.getSinglePost(postId)),
    map((res) => res.content),
    handleError()
  );

  public readonly postComments$: Observable<Comment[]> = this.post$.pipe(
    filter((post) => !!post),
    switchMap((post) => this.commentService.getPostComments(post!.id)),
    map((res) => res.content),
    withLatestFrom(this.post$),
    map(([comments, post]) => {
      // add description as the first comment
      if (post !== undefined && post.description !== undefined) {
        comments.unshift({
          id: 'description',
          createdAt: post.createdAt,
          userId: post.userId,
          postId: post.id,
          content: post.description,
          parentId: null
        });
      }

      return comments;
    })
  );

  public readonly userProfile$: Observable<Profile> = this.post$.pipe(
    filter((post) => post !== undefined),
    switchMap((post) => {
      const userId = post?.userId;
      return userId === undefined ? [] : this.profileService.getProfile(userId).pipe(map((res) => res.content));
    })
  );

  constructor(
    private readonly postService: PostService,
    private readonly route: ActivatedRoute,
    private readonly profileService: ProfileService,
    private readonly commentService: CommentService
  ) {
    super();
  }

  public ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const postId = params['id'];
      this.postIdSubject.next(postId);
    });
  }
}
