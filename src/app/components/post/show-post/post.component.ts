import { Component } from '@angular/core';
import { PostService } from 'app/core/services/post.service';
import { GenericResponse } from 'app/models/generic-response.model';
import { Post } from 'app/models/post.model';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'app/core/services/profile.service';
import { Profile } from 'app/models/profile.model';

@Component({
  selector: 'mds-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  showComments: boolean = false;
  formattedDate: string | undefined;
  author: Partial<Profile> | undefined;
  media: String[] | undefined;
  idxMedia: number = 0;
  postMetaData: Partial<Post> | undefined;
  constructor(private postService: PostService, private profileService: ProfileService, private route: ActivatedRoute) {

  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      const postId = params['id'];

      // loading metadata
      this.postService.getSinglePost(postId)
        .subscribe((x: GenericResponse<Partial<Post>>) => {
          if (x.error) {
            console.log(x.error);
          } else {
            this.postMetaData = x.content;

            // format date
            const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            this.formattedDate = new Date(this.postMetaData.createdAt!).toLocaleDateString(undefined, dateOptions);

            // need this to display author's user name
            this.profileService.getProfile(x.content.userId!)
              .subscribe((y: GenericResponse<Partial<Profile>>) => {
                if (y.error) {
                  console.log(y.error);
                } else {
                  this.author = y.content;
                }
              });
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

  onToggleShowComments() {
    this.showComments = !this.showComments;
  }

  isShowComments() {
    return this.postMetaData && this.showComments;
  }

  isShowArrowBack() {
    return this.idxMedia > 0;
  }

  isShowArrowForward() {
    return this.idxMedia < this.media?.length! - 1;
  }
}
