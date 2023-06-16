import { Component } from '@angular/core';
import { openClosedAnimation } from 'app/animations';
import { FeedService } from 'app/core/services/feed.service';
import { GenericResponse } from 'app/models/generic-response.model';
import { Post } from 'app/models/post.model';
import { filter, tap } from 'rxjs';

@Component({
   selector: 'mds-feed',
   templateUrl: './feed.component.html',
   styleUrls: ['./feed.component.scss'],
   animations: [openClosedAnimation]
})

export class FeedComponent {
   posts: Post[] | undefined;

   constructor(private feedService: FeedService) {
      
   }

   ngOnInit(){
      this.feedService.getFeed()
      .pipe(
         tap((res: GenericResponse<Post[]>) => {
            if (res.error)
              console.log(res.error);
          }),
          filter((res: GenericResponse<Post[]>) => !res.error),
          tap((res: GenericResponse<Post[]>) => {
            this.posts = res.content;
          }),
      )
      .subscribe();
   }
}