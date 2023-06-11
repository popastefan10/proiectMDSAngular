import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'app/models/post.model';
import { CreatePostFormType } from './create-post.type';
import { PostCreate } from 'app/models/post-create.model';
import { GenericResponse } from 'app/models/generic-response.model';
import { PostService } from 'app/core/services/post.service';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { CustomError, ErrorResponse } from 'app/shared/utils/error';
import { openClosedAnimation } from 'app/animations';
import { Router } from '@angular/router';

interface Image {
  file: File;
  src: string;
}

const MAX_NR_IMAGES = 10;

@Component({
  selector: 'mds-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
  animations: [openClosedAnimation]
})
export class CreatePostComponent implements OnInit {
  maxNrFiles: number = 10;
  // use this to store file indices
  idxList: number[] = Array.from(Array(this.maxNrFiles).keys());
  uploadedFiles: (File | undefined)[] = Array(this.maxNrFiles);

  private readonly imagesSubject: BehaviorSubject<Image[]> = new BehaviorSubject<Image[]>([]);
  public readonly images$ = this.imagesSubject.asObservable();
  public readonly canUpload$: Observable<boolean> = this.images$.pipe(map((images) => images.length < MAX_NR_IMAGES));
  public readonly uploadMessage$: Observable<string> = this.canUpload$.pipe(
    map((canUpload) => {
      if (!canUpload) return 'You have reached the maximum number of images.';
      if (this.imagesSubject.value.length === 0) return ' Upload an image ';
      return '';
    })
  );

  public readonly uploaded$: Observable<boolean> = this.images$.pipe(map((images) => images.length > 0));

  public readonly fiveUploaded$: Observable<boolean> = this.images$.pipe(map((images) => images.length === 5));


  public readonly createPostForm: FormGroup<CreatePostFormType> = this.formBuilder.nonNullable.group({
    description: ['', Validators.required]
  });

  public createPostError: CustomError | undefined;

  constructor(
    private readonly postService: PostService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  public get description() {
    return this.createPostForm.controls.description;
  }

  onImageUpload(file: File) {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent) => {
      const target = e.target as FileReader;
      if (target && target.result) {
        const newImage: Image = {
          file,
          src: target.result as string
        };

        const images = [...this.imagesSubject.value];
        images.push(newImage);

        this.imagesSubject.next(images);
      }
    };

    reader.readAsDataURL(file);
  }

  onImageRemove(idx: number) {
    const images = [...this.imagesSubject.value];
    images.splice(idx, 1);
    this.imagesSubject.next(images);
  }

  onSubmit() {
    if (this.createPostForm.invalid) return;

    const files: File[] = this.imagesSubject.value.map((img) => img.file);
    const data: PostCreate = {
      description: this.createPostForm.value.description,
      media: files
    };

    this.postService
      .create(data)
      .pipe(
        tap((_res: GenericResponse<Partial<Post>>) => {
          this.createPostForm.reset();
          this.imagesSubject.next([]);
          this.router.navigateByUrl('/feed');
        }),
        catchError((err: ErrorResponse) => {
          this.createPostError = err.error.error;

          return of(err);
        })
      )
      .subscribe();
  }
}
