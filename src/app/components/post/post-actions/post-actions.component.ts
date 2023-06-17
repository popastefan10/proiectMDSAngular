import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PostLikeService } from 'app/core/services/post-like.service';
import { UserService } from 'app/core/services/user.service';
import { Post } from 'app/models/post.model';
import { formatInstagramTimestamp } from 'app/shared/utils/date';
import { catchError, withLatestFrom } from 'rxjs';

@Component({
  selector: 'mds-post-actions',
  templateUrl: './post-actions.component.html',
  styleUrls: ['./post-actions.component.scss']
})
export class PostActionsComponent implements OnInit, OnChanges {
  @Input() public post!: Post;
  public dateFormatted: string = '';
  public likesPost: boolean = false;
  public likesCount: number = -1;

  constructor(private readonly postLikeService: PostLikeService, private readonly userService: UserService) {}

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['post'].currentValue) {
      const post = changes['post'].currentValue as Post;
      this.dateFormatted = formatInstagramTimestamp(post.createdAt);

      this.postLikeService
        .getPostLikes(post.id)
        .pipe(withLatestFrom(this.userService.currentUser$))
        .subscribe(([res, currentUser]) => {
          const likes = res.content;
          this.likesPost = likes.some((like) => like.userId === currentUser?.id);
        });

      this.postLikeService.getPostLikesCount(post.id).subscribe((res) => {
        this.likesCount = res.content.count;
      });
    }
  }

  private _likePost(): void {
    this.likesPost = true;
    this.likesCount++;
    this.postLikeService
      .create(this.post.id)
      .pipe(
        catchError((err) => {
          console.error(err);
          this.likesPost = false;
          this.likesCount--;
          return [];
        })
      )
      .subscribe();
  }

  private _unlikePost(): void {
    this.likesPost = false;
    this.likesCount--;
    this.postLikeService
      .delete(this.post.id)
      .pipe(
        catchError((err) => {
          console.error(err);
          this.likesPost = true;
          this.likesCount++;
          return [];
        })
      )
      .subscribe();
  }

  public toggleLike(): void {
    if (this.likesPost) {
      this._unlikePost();
    } else {
      this._likePost();
    }
  }
}
