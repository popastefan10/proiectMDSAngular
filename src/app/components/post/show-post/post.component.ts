import { Component, Input } from '@angular/core';
import { GenericResponse } from 'app/models/generic-response.model';
import { Post } from 'app/models/post.model';
import { ProfileService } from 'app/core/services/profile.service';
import { Profile } from 'app/models/profile.model';
import { tap } from 'rxjs';

@Component({
  selector: 'mds-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  @Input() post: Post | undefined;
  formattedDate: string | undefined;
  author: Partial<Profile> | undefined;
  idxMedia: number = 0;
  showComments: boolean = false;
  constructor(private profileService: ProfileService) {

  }

  ngOnInit() {

    // format date
    const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    this.formattedDate = new Date(this.post?.createdAt!).toLocaleDateString(undefined, dateOptions);

    

    // need this to display author's user name
    this.profileService.getProfile(this.post?.userId!)
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

  }

  onBackArrowClick() {
    if (this.idxMedia > 0) {
      this.idxMedia -= 1;
    }
  }

  onForwardArrowClick() {
    if (this.post?.picturesURLs && this.idxMedia < this.post?.picturesURLs.length - 1) {
      this.idxMedia += 1;
    }
  }

  onToggleShowComments() {
    this.showComments = !this.showComments;
  }
}
