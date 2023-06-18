import { Component, Input } from '@angular/core';
import { FollowerService } from 'app/core/services/follower.service';
import { ProfileService } from 'app/core/services/profile.service';
import { Profile } from 'app/models/profile.model';
import { openClosedAnimation } from 'app/shared/utils/animations';
import { handleError } from 'app/shared/utils/error';
import { take } from 'rxjs/operators';

@Component({
  selector: 'mds-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss'],
  animations: [openClosedAnimation]
})
export class FollowersComponent {
  @Input() userId!: string;

  public followersList: Profile[] = [];
  public numFollowers: number = 0;
  public showFollowers: boolean = false;

  public followsList: Profile[] = [];
  public numFollows: number = 0;
  public showFollows: boolean = false;

  public profilePictures: { [key: string]: string } = {};

  constructor(private readonly followerService: FollowerService, private readonly profileService: ProfileService) {}

  ngOnInit(): void {
    this.getFollowers(this.userId);
    this.getFollowing(this.userId);
  }

  private getFollowers(userId: string): void {
    this.followerService
      .getFollowers(userId)
      .pipe(handleError())
      .subscribe((response) => {
        const filteredFollowers = response.content.filter((follower) => follower.accepted);
        const followerIds = filteredFollowers.map((follower) => follower.followedBy);
        this.profileService.getProfileRange(followerIds).subscribe((response) => {
          this.followersList = response.content;
          this.numFollowers = this.followersList.length;
          this.loadProfilePictures();
        });
      });
  }

  private getFollowing(userId: string): void {
    this.followerService
      .getFollows(userId)
      .pipe(handleError())
      .subscribe((response) => {
        const filteredFollowing = response.content.filter((follower) => follower.accepted);
        const followingIds = filteredFollowing.map((follower) => follower.follows);
        this.profileService
          .getProfileRange(followingIds)
          .pipe(handleError())
          .subscribe((response) => {
            this.followsList = response.content;
            this.numFollows = this.followsList.length;
            this.loadProfilePictures();
          });
      });
  }

  private loadProfilePictures(): void {
    this.followersList.forEach((follower) => {
      const profileId = follower.id;
      this.profileService
        .getProfilePicture(profileId)
        .pipe(take(1), handleError())
        .subscribe((response) => {
          if (response.content && response.content.profilePictureURL) {
            this.profilePictures[profileId] = response.content.profilePictureURL;
          }
        });
    });
    this.followsList.forEach((following) => {
      const profileId = following.id;
      this.profileService
        .getProfilePicture(profileId)
        .pipe(take(1), handleError())
        .subscribe((response) => {
          if (response.content && response.content.profilePictureURL) {
            this.profilePictures[profileId] = response.content.profilePictureURL;
          }
        });
    });
  }

  public getProfilePicture(profile: Profile): string {
    const profileId = profile.id;
    return this.profilePictures[profileId] || '';
  }

  toggleFollowers(): void {
    this.showFollowers = !this.showFollowers;
  }

  toggleFollows(): void {
    this.showFollows = !this.showFollows;
  }
}
