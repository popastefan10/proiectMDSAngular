import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'app/core/services/post.service';
import { Post } from 'app/models/post.model';
import { SubscriptionCleanup } from 'app/shared/utils/subscription-cleanup';
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  map,
  merge,
  of,
  scan,
  startWith,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom
} from 'rxjs';

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
  public readonly numberOfPictures$: Observable<number> = this.post$.pipe(
    filter((post) => post !== undefined),
    map((post) => (post ? post.picturesURLs.length : 0))
  );

  private readonly prevSubject: BehaviorSubject<void> = new BehaviorSubject<void>(undefined); // controled by left arrow
  public readonly prev$: Observable<void> = this.prevSubject.asObservable();
  private readonly nextSubject: BehaviorSubject<void> = new BehaviorSubject<void>(undefined); // controled by right arrow
  public readonly next$: Observable<void> = this.nextSubject.asObservable();
  public readonly nextPrev$: Observable<'prev' | 'next'> = merge(
    this.prev$.pipe(map((): 'prev' => 'prev')),
    this.next$.pipe(map((): 'next' => 'next'))
  );

  public readonly currentIndex$: Observable<number> = this.nextPrev$.pipe(
    withLatestFrom(this.numberOfPictures$),
    scan((idx: number, [direction, numberOfPictures]) => this.getIndex(idx, direction, numberOfPictures), 0),
    startWith(0)
  );
  public readonly prevIndex$ = this.currentIndex$.pipe(map((idx) => idx - 1));
  public readonly nextIndex$ = this.currentIndex$.pipe(map((idx) => idx + 1));

  constructor(private postService: PostService, private route: ActivatedRoute) {
    super();
  }

  // get next or previous index, without going out of bounds
  private getIndex(currentIndex: number, direction: 'prev' | 'next', numberOfPictures: number): number {
    if (direction === 'prev') {
      return Math.max(currentIndex - 1, 0);
    }
    return Math.min(currentIndex + 1, numberOfPictures - 1);
  }

  public ngOnInit() {
    this.post$.subscribe((post) => {
      console.log('post', post);
    });
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const postId = params['id'];
      this.postIdSubject.next(postId);
    });
  }

  showPreviousImage() {
    this.prevSubject.next();
  }

  showNextImage() {
    this.nextSubject.next();
  }
}
