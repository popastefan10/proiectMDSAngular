import { Component } from '@angular/core';
import { Comment, CommentShow } from '../../../models/comment.model';
import { CommentService } from 'app/core/services/comment.service';
import { ProfileService } from 'app/core/services/profile.service';
import { ActivatedRoute } from '@angular/router';
import { GenericResponse } from 'app/models/generic-response.model';
import { Profile } from 'app/models/profile.model';

@Component({
  selector: 'mds-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent {
  rootComments: Partial<CommentShow>[] | undefined;
  childComments: {
    [key: string]: Partial<CommentShow>[]
  } = {};

  constructor(private commentService: CommentService, private profileService: ProfileService, private route: ActivatedRoute) {

  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      const postId = params['id'];

      // loading metadata
      this.commentService.getPostReplies(postId)
        .subscribe((res: GenericResponse<Partial<Comment>[]>) => {
          if (res.error) {
            console.log(res.error);
          } else {
            this.rootComments = [];
            res.content.forEach(x => {
              this.rootComments?.push({
                metadata: x,
              });
            });

            this.rootComments.forEach(comm => {
              // need this to display author's user name
              this.profileService.getProfile(comm.metadata!.userId!)
                .subscribe((y: GenericResponse<Partial<Profile>>) => {
                  if (y.error) {
                    console.log(y.error);
                  } else {
                    comm.author = y.content;
                  }
                });
            });
          }
        });

    });
  }

  onShowRepliesClick(id: string) {
    this.commentService.getCommentReplies(id)
      .subscribe((res: GenericResponse<Partial<Comment>[]>) => {
        if (res.error) {
          console.log(res.error);
        } else {
          this.childComments[id] = [];
          res.content.forEach(x => {
            this.childComments[id]?.push({
              metadata: x,
            });
          });

          this.childComments[id].forEach(comm => {
            // need this to display author's user name
            this.profileService.getProfile(comm.metadata!.userId!)
              .subscribe((y: GenericResponse<Partial<Profile>>) => {
                if (y.error) {
                  console.log(y.error);
                } else {
                  comm.author = y.content;
                }
              });
          });
        }
      });
  }
}
