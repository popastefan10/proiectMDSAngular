import { Component } from '@angular/core';
import { UserService } from 'app/core/services/user.service';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { SessionUser } from 'app/models/session-user.model';
import { handleError } from 'app/shared/utils/error';

@Component({
  selector: 'mds-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public readonly isLoggedIn$: Observable<boolean> = this.userService.isLoggedIn$;
  public readonly currentUser$: Observable<SessionUser | undefined> = this.userService.currentUser$;

  private readonly router: Router = new Router();
  constructor(private readonly userService: UserService) {}

  public logout() {
    this.userService.logout().subscribe();

    this.userService
      .logout()
      .pipe(catchError(handleError()))
      .subscribe(() => this.router.navigate(['/']));
  }
}
