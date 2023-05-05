import { Component } from '@angular/core';
import { PostService } from 'app/core/services/post.service';
import { GenericResponse } from 'app/models/generic-response.model';
import { Post } from 'app/models/post.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mds-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  media: String[] | undefined;
  idxMedia: number = 0;
  postMetaData: Partial<Post> | undefined;
  constructor(private postService: PostService, private route: ActivatedRoute) {

  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      const postId = params['id'];

      this.postService.getSinglePost(postId)
        .subscribe((x: GenericResponse<Partial<Post>>) => {
          if (x.error) {
            console.log(x.error);
          } else {
            this.postMetaData = x.content;
          }
        });

      this.postService.getPostMedia(postId)
        .subscribe((x: GenericResponse<Partial<Post>>) => {
          if (x.error) {
            console.log(x.error);
          } else {
            this.media = x.content.picturesURLs;
          }
        });
    });
  }

  onBackArrowClick() {
    if (this.idxMedia > 0) {
      this.idxMedia -= 1;
    }
  }

  onForwardArrowClick() {
    if (this.media && this.idxMedia < this.media.length - 1) {
      this.idxMedia += 1;
    }
  }
}
