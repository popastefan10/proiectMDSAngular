import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommentService } from 'app/core/services/comment.service';
import { CommentCreate } from 'app/models/comment-create.model';
import { Comment } from 'app/models/comment.model';
import { Post } from 'app/models/post.model';
import { handleError } from 'app/shared/utils/error';
import { tap } from 'rxjs';

@Component({
  selector: 'mds-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss']
})
export class PostCommentsComponent implements OnChanges {
  @Input() public post!: Post;
  public comments: Comment[] = [];

  public newComment: string = '';

  constructor(private readonly commentService: CommentService) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['post']?.currentValue) {
      this.commentService
        .getPostComments(this.post.id)
        .pipe(
          tap((res) => {
            this.comments = res.content;

            // add description as the first comment
            if (!!this.post.description) {
              const description: Comment = {
                id: 'description',
                createdAt: this.post.createdAt,
                userId: this.post.userId,
                postId: this.post.id,
                content: this.post.description,
                parentId: null
              };
              this.comments.unshift(description);
            }
          }),
          handleError()
        )
        .subscribe();
    }
  }

  public addComment(): void {
    const newComment: CommentCreate = {
      content: this.newComment,
      postId: this.post.id,
      parentId: null
    };

    this.commentService
      .create(newComment)
      .pipe(handleError())
      .subscribe((res) => {
        this.comments.push(res.content);
        this.newComment = '';
      });
  }
}
