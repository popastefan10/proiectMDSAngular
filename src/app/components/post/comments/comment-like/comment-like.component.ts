import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommentLikeService } from 'app/core/services/comment-like.service';
import { UserService } from 'app/core/services/user.service';
import { Comment } from 'app/models/comment.model';
import { formatInstagramTimestamp } from 'app/shared/utils/date';
import { catchError, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'mds-comment-like',
  templateUrl: './comment-like.component.html',
  styleUrls: ['./comment-like.component.scss']
})
export class CommentLikeComponent implements OnInit, OnChanges {
  @Input() public comment!: Comment;
  public dateFormatted: string = '';
  public likesComment: boolean = false;
  public likesCount: number = -1;

  constructor(private readonly commentLikeService: CommentLikeService, private readonly userService: UserService) {}

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['comment'].currentValue) {
      const comment = changes['comment'].currentValue as Comment;
      console.log('change', comment);
      this.dateFormatted = formatInstagramTimestamp(comment.createdAt);

      this.commentLikeService
        .getCommentLikes(comment.id)
        .pipe(withLatestFrom(this.userService.currentUser$))
        .subscribe(([res, currentUser]) => {
          const likes = res.content;
          this.likesComment = likes.some((like) => like.userId === currentUser?.id);
        });

      this.commentLikeService.getCommentLikesCount(comment.id).subscribe((res) => {
        this.likesCount = res.content.count;
      });
    }
  }

  private _likePost(): void {
    this.likesComment = true;
    this.likesCount++;
    this.commentLikeService
      .create(this.comment.id)
      .pipe(
        catchError((err) => {
          console.error(err);
          this.likesComment = false;
          this.likesCount--;
          return [];
        })
      )
      .subscribe();
  }

  private _unlikePost(): void {
    this.likesComment = false;
    this.likesCount--;
    this.commentLikeService
      .delete(this.comment.id)
      .pipe(
        catchError((err) => {
          console.error(err);
          this.likesComment = true;
          this.likesCount++;
          return [];
        })
      )
      .subscribe();
  }

  public toggleLike(): void {
    if (this.likesComment) {
      this._unlikePost();
    } else {
      this._likePost();
    }
  }
}
