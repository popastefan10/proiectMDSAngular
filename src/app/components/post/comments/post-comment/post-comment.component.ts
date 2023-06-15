import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { openClosedAnimation } from 'app/animations';
import { CommentService } from 'app/core/services/comment.service';
import { ProfileService } from 'app/core/services/profile.service';
import { CommentCreate } from 'app/models/comment-create.model';
import { Comment } from 'app/models/comment.model';
import { Profile } from 'app/models/profile.model';
import { formatInstagramTimestamp } from 'app/shared/utils/date';
import { catchError } from 'rxjs';

@Component({
  selector: 'mds-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss'],
  animations: [openClosedAnimation]
})
export class PostCommentComponent implements OnInit, OnChanges {
  @Input() public comment!: Comment;
  public isDescription: boolean = false;
  public userProfile?: Profile | undefined;
  public dateFormatted: string = '';

  public replyContent: string = '';
  public isReplying: boolean = false;

  public showReplies: boolean = false;
  public replies: Comment[] = [];

  constructor(private readonly profileService: ProfileService, private readonly commentService: CommentService) {}

  public ngOnInit(): void {
    this.profileService.getProfile(this.comment.userId).subscribe((res) => {
      this.userProfile = res.content;
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['comment']) {
      const comment = changes['comment'].currentValue as Comment;
      this.isDescription = comment.id === 'description';
      this.dateFormatted = formatInstagramTimestamp(comment.createdAt);

      // fetch user profile
      this.profileService.getProfile(comment.userId).subscribe((res) => {
        this.userProfile = res.content;
      });

      // fetch replies
      this.commentService.getCommentReplies(comment.id).subscribe((res) => {
        this.replies = res.content;
      });
    }
  }

  public onReplyClick(): void {
    this.isReplying = true;
  }

  public addReply() {
    const reply: CommentCreate = {
      postId: this.comment.postId,
      content: this.replyContent,
      parentId: this.comment.id
    };
    this.commentService
      .create(reply)
      .pipe(
        catchError((err) => {
          console.log(err);
          return [];
        })
      )
      .subscribe((res) => {
        this.isReplying = false;
        this.replyContent = '';
        this.replies.push(res.content);
      });
  }

  public cancelReply() {
    this.isReplying = false;
    this.replyContent = '';
  }

  public toggleReplies() {
    this.showReplies = !this.showReplies;
  }
}