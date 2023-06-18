import { Component, Input } from '@angular/core';
import { ProfileService } from 'app/core/services/profile.service';
import { GenericResponse } from 'app/models/generic-response.model';
import { Post } from 'app/models/post.model';
import { Profile } from 'app/models/profile.model';
import { tap } from 'rxjs';

@Component({
  selector: 'mds-show-post-feed',
  templateUrl: './show-post-feed.component.html',
  styleUrls: ['./show-post-feed.component.scss']
})
export class ShowPostFeedComponent {
  @Input() post: Post | undefined;
  formattedDate: string | undefined;
  author: Partial<Profile> | undefined;
  idxMedia: number = 0;
  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    // format date
    const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    this.formattedDate = new Date(this.post?.createdAt!).toLocaleDateString(undefined, dateOptions);

    // need this to display author's user name
    this.profileService
      .getProfile(this.post?.userId!)
      .pipe(tap((y: GenericResponse<Partial<Profile>>) => (this.author = y.content)))
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
}
