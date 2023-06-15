import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'app/core/services/post.service';
import { Post } from 'app/models/post.model';
import { SubscriptionCleanup } from 'app/shared/utils/subscription-cleanup';
import { BehaviorSubject, Observable, catchError, filter, map, of, switchMap, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'mds-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent extends SubscriptionCleanup {
  private readonly postIdSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public readonly postId$: Observable<string> = this.postIdSubject.asObservable();

  public readonly post$: Observable<Post | undefined> = this.postId$.pipe(
    filter((postId) => postId !== ''),
    switchMap((postId) => this.postService.getSinglePost(postId)),
    map((res) => res.content),
    tap((post) => (post.picturesURLs = post.picturesURLs.map((url) => '/api/' + url))),
    catchError((err) => {
      console.error(err);

      return of(undefined);
    })
  );

  constructor(private postService: PostService, private route: ActivatedRoute) {
    super();
  }

  public ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const postId = params['id'];
      this.postIdSubject.next(postId);
    });
  }
}
