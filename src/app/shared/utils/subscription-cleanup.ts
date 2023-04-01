import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

// This is not intended to be used as a directive, this decorator silences a tsc error.
@Directive()
export class SubscriptionCleanup implements OnDestroy {
  protected readonly destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnDestroy(): void {
    this.destroy$.next(true);
    // Unsubscribe from the subject itself
    this.destroy$.complete();
  }
}
