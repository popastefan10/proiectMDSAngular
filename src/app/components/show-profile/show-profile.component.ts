import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'app/core/services/profile.service';
import { Profile } from 'app/models/profile.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.scss']
})
export class ShowProfileComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();
  public profile: Profile | undefined;
  public profilePictureUrl: string | undefined;

  constructor(
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sub.add(
      this.activatedRoute.params.subscribe(params => {
        this.getProfile(params['userId']);
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private getProfile(userId: string): void {
    this.sub.add(
      this.profileService.getProfile(userId).subscribe(response => {
        if (response.error) {
          console.log(response.error);
        } else {
          this.profile = response.content;
          this.getProfilePicture();
        }
      })
    );
  }

  private getProfilePicture(): void {
    if (!this.profile) {
      return;
    }
    const profileId = this.profile.id;
    this.sub.add(
      this.profileService.getProfilePicture(profileId).subscribe(response => {
        if (response.error) {
          console.log(response.error);
        } else {
          this.profilePictureUrl = response.content?.profilePictureURL;
        }
      })
    );
  }
}
