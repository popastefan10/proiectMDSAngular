import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from 'app/core/services/user.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard {
  constructor(private readonly userService: UserService, private readonly router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.isLoggedIn$.pipe(
      tap((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          // User is not logged in, redirect to login page or any other desired route
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
