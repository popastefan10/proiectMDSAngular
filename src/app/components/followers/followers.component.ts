import { Component, Input } from "@angular/core";
import { FollowerService } from "app/core/services/follower.service";
import { ProfileService } from "app/core/services/profile.service";
import { Profile } from "app/models/profile.model";
import { take } from "rxjs/operators";

@Component({
  selector: 'mds-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent {
  @Input() userId!: string;

  public followers: Profile[] = [];
  public numFollowers: number = 0;
  public showFollowers: boolean = false;
  public profilePictures: { [key: string]: string } = {};

  constructor(private readonly followerService: FollowerService, private readonly profileService: ProfileService) {}

  ngOnInit(): void {
    this.getFollowers(this.userId);
  }

  private getFollowers(userId: string): void {
    this.followerService.getFollowers(userId).subscribe(response => {
      if (response.error) {
        console.log(response.error);
      } else {
        const filteredFollowers = response.content.filter(follower => follower.accepted);
        const followerIds = filteredFollowers.map(follower => follower.followedBy);
        this.profileService.getProfileRange(followerIds).subscribe(response => {
          if (response.error) {
            console.log(response.error);
          } else {
            console.log(response.content);
            this.followers = response.content;
            this.numFollowers = this.followers.length;
            this.loadProfilePictures();
          }
        });
      }
    });
  }

  private loadProfilePictures(): void {
    this.followers.forEach(follower => {
      const profileId = follower.id;
      this.profileService.getProfilePicture(profileId)
        .pipe(take(1))
        .subscribe(response => {
          if (!response.error && response.content && response.content.profilePictureURL) {
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
}
