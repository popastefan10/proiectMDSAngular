import { Component, Input } from '@angular/core';
import { PostService } from 'app/core/services/post.service';
import { GenericResponse } from 'app/models/generic-response.model';
import { Post } from 'app/models/post.model';
import { ProfileService } from 'app/core/services/profile.service';
import { Profile } from 'app/models/profile.model';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'mds-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  @Input() postId: string | undefined;
  showComments: boolean = false;
  formattedDate: string | undefined;
  author: Partial<Profile> | undefined;
  media: String[] | undefined;
  idxMedia: number = 0;
  postMetaData: Partial<Post> | undefined;
  constructor(private postService: PostService, private profileService: ProfileService) {

  }

  ngOnInit() {

    // loading metadata
    this.postService.getSinglePost(this.postId!)
      .pipe(
        tap((res: GenericResponse<Partial<Post>>) => {
          if (res.error)
            console.log(res.error);
        }),
        filter((res: GenericResponse<Partial<Post>>) => !res.error),
        tap((res: GenericResponse<Partial<Post>>) => {
          this.postMetaData = res.content;

          // format date
          const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
          this.formattedDate = new Date(this.postMetaData.createdAt!).toLocaleDateString(undefined, dateOptions);

          // need this to display author's user name
          this.profileService.getProfile(res.content.userId!)
            .pipe(
              tap((y: GenericResponse<Partial<Profile>>) => {
                if (y.error) {
                  console.log(y.error);
                } else {
                  this.author = y.content;
                }
              })
            )
            .subscribe();
        })
      )
      .subscribe();

    this.postService.getPostMedia(this.postId!)
      .pipe(
        tap((res: GenericResponse<Partial<Post>>) => {
          if (res.error) {
            console.log(res.error);
          } else {
            this.media = res.content.picturesURLs;
          }
        })
      )
      .subscribe();


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
}
