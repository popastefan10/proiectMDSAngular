import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CommentService } from 'app/core/services/comment.service';
import { ProfileService } from 'app/core/services/profile.service';
import { Comment } from 'app/models/comment.model';
import { Post } from 'app/models/post.model';
import { Profile } from 'app/models/profile.model';

@Component({
  selector: 'mds-feed-post',
  templateUrl: './feed-post.component.html',
  styleUrls: ['./feed-post.component.scss']
})
export class FeedPostComponent implements OnInit, OnChanges {
  @Input() post!: Post;
  public userProfile?: Profile | undefined;
  public comments: Comment[] = [];

  constructor(
    private readonly profileService: ProfileService,
    private readonly commentService: CommentService,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['post']?.currentValue) {
      const post = changes['post'].currentValue as Post;

      this.profileService.getProfile(post.userId).subscribe((res) => {
        this.userProfile = res.content;
      });

      this.commentService.getPostComments(post.id).subscribe((res) => {
        this.comments = res.content;
      });
    }
  }

  public openPost(): void {
    this.router.navigate(['/', 'posts', this.post.id]);
  }
}
