import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'app/core/services/post.service';
import { GenericResponse } from 'app/models/generic-response.model';
import { Post } from 'app/models/post.model';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'mds-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent {

  post: Post | undefined;
  showComments: boolean = false;
  formattedDate: string | undefined;
  media: string[] = [];
  idxMedia: number = 0;
  postMetaData: Partial<Post> | undefined;
  constructor(private postService: PostService, private route: ActivatedRoute) {

  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      const postId = params['id'];
    
      // loading metadata
      this.postService.getSinglePost(postId)
        .pipe(
          tap((res: GenericResponse<Partial<Post>>) => {
            if (res.error)
              console.log(res.error);
          }),
          filter((res: GenericResponse<Partial<Post>>) => !res.error),
          tap((res: GenericResponse<Partial<Post>>) => {
            this.postMetaData = res.content;

            this.postService.getPostMedia(postId)
              .pipe(
                tap((res: GenericResponse<Partial<Post>>) => {
                  if (res.error) {
                    console.log(res.error);
                  } else {
                    this.media = res.content.picturesURLs!;

                    this.post = {
                      id: this.postMetaData!.id!,
                      createdAt: this.postMetaData!.createdAt!,
                      userId: this.postMetaData!.userId!,
                      description: this.postMetaData!.description!,
                      picturesURLs: this.media,
                    };

                    console.log(this.post);

                  }
                })
              )
              .subscribe();
          })
        )
        .subscribe();

    });
  }

}
