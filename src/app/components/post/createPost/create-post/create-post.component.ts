import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Post } from 'app/models/post.model';
import { CreatePostFormType } from './create-post.type';
import { PostCreate } from 'app/models/post-create.model';
import { GenericResponse } from 'app/models/generic-response.model';
import { PostService } from 'app/core/services/post.service';
// import { PostService } from 'app/core/services/post.service';

@Component({
  selector: 'mds-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {

  maxNrFiles: number = 10;
  // use this to store file indices
  idxList: number[] = Array.from(Array(this.maxNrFiles).keys());
  uploadedFiles: (File | undefined)[] = Array(this.maxNrFiles);
  createPostForm: FormGroup<CreatePostFormType> = this.formBuilder.nonNullable.group({
    description: '',
  });

  constructor(private postService: PostService, private formBuilder: FormBuilder) {
  }

  onFileUpload(event: Event, idx: number) {

    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      this.uploadedFiles[idx] = target.files[0];
      const preview = document.getElementById('preview' + idx.toString()) as HTMLImageElement;
      preview.src = URL.createObjectURL(target.files[0]);
    }
  }

  onFileRemove(idx: number) {

    const elem = document.getElementById('media' + idx.toString()) as HTMLInputElement;
    elem.value = "";
    this.uploadedFiles[idx] = undefined;
    const preview = document.getElementById('preview' + idx.toString()) as HTMLImageElement;
    preview.src = "";
  }

  onSubmit() {

    const actualFiles: File[] = [];

    this.uploadedFiles.forEach(x => {
      if (x) {
        actualFiles.push(x);
      }
    })

    const data: PostCreate = {
      description: this.createPostForm.value.description,
      media: actualFiles,
    };

    this.postService.create(data)
    .subscribe((res: GenericResponse<Partial<Post>>) => {
        if (res.error){
          console.log(res.error);
        }else{
          console.log(res.content);
          this.createPostForm.reset();
          for (let i = 0; i < this.maxNrFiles; ++i){
            this.onFileRemove(i);
          }
        }
    });

  }
}
