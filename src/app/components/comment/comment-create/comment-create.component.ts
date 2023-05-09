import { Component, Input } from '@angular/core';
import { CreateCommentFormType } from './create-comment.type';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommentService } from 'app/core/services/comment.service';
import { Comment } from '../../../models/comment.model';
import { GenericResponse } from 'app/models/generic-response.model';
import { tap } from 'rxjs';

@Component({
  selector: 'mds-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.scss']
})
export class CommentCreateComponent {
  @Input() parentId: string | undefined;
  @Input() postId: string | undefined;

  createCommentForm: FormGroup<CreateCommentFormType> = this.formBuilder.nonNullable.group({
    content: '',
  });

  constructor(private commentService: CommentService, private formBuilder: FormBuilder) {
  }

  onSubmit() {
    const reply: Partial<Comment> = {
      parentId: this.parentId,
      postId: this.postId,
      content: this.createCommentForm.value.content,
    };

    this.commentService.create(reply)
      .pipe(tap((res: GenericResponse<Partial<Comment>>) => {
        if (res.error) {
          console.log(res.error);
        } else {
          console.log(res.content);
          this.createCommentForm.reset();
        }
      }))
      .subscribe();
  }
}
