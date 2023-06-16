import { Component, Input } from '@angular/core';
import { CommentService } from 'app/core/services/comment.service';
import { CommentCreate } from 'app/models/comment-create.model';
import { Comment } from 'app/models/comment.model';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'mds-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss']
})
export class PostCommentsComponent {
  @Input() public postId: string = '';
  @Input() public comments: Comment[] = [];

  public newComment: string = '';

  constructor(private readonly commentService: CommentService) {}

  public addComment(): void {
    const newComment: CommentCreate = {
      content: this.newComment,
      postId: this.postId,
      parentId: null
    };

    this.commentService
      .create(newComment)
      .pipe(
        catchError((err) => {
          console.error(err);
          return [];
        })
      )
      .subscribe((res) => {
        this.comments.push(res.content);
        this.newComment = '';
      });
  }
}
