import { Component } from '@angular/core';
import { openClosedAnimation } from 'app/animations';
import { FeedService } from 'app/core/services/feed.service';
import { GenericResponse } from 'app/models/generic-response.model';
import { Post } from 'app/models/post.model';
import { Observable, catchError, filter, map, tap } from 'rxjs';

@Component({
  selector: 'mds-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  animations: [openClosedAnimation]
})
export class FeedComponent {
  public readonly feed$: Observable<Post[]> = this.feedService.getFeed().pipe(
    map((res: GenericResponse<Post[]>) => res.content),
    catchError((err: any) => {
      console.error(err);
      return [];
    })
  );
  posts: Post[] | undefined;

  constructor(private feedService: FeedService) {}

  ngOnInit() {}
}
