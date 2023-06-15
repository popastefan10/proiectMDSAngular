import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProfileService } from 'app/core/services/profile.service';
import { Comment } from 'app/models/comment.model';
import { Profile } from 'app/models/profile.model';

@Component({
  selector: 'mds-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent implements OnInit, OnChanges {
  @Input() public comment!: Comment;
  public userProfile?: Profile | undefined;

  constructor(private readonly profileService: ProfileService) {}

  public ngOnInit(): void {
    this.profileService.getProfile(this.comment.userId).subscribe((res) => {
      this.userProfile = res.content;
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['comment']) {
      const comment = changes['comment'].currentValue as Comment;
      this.profileService.getProfile(comment.userId).subscribe((res) => {
        this.userProfile = res.content;
      });
    }
  }
}
