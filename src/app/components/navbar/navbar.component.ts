import { Component } from '@angular/core';
import { UserService } from 'app/core/services/user.service';
import {Observable, throwError} from 'rxjs';
import {reportUnhandledError} from "rxjs/internal/util/reportUnhandledError";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'mds-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public readonly isLoggedIn$: Observable<boolean> = this.userService.isLoggedIn$;

  private readonly router: Router = new Router();
  constructor(private readonly userService: UserService) {}

  public logout() {
    this.userService.logout().subscribe();

    function handleError(error: any) {
      // Handle the error here
      console.error('An error occurred:', error);
      // Optionally, rethrow the error to propagate it further
      return throwError(error);
    }

    this.userService.logout().
      pipe(
        catchError(handleError)
      )
      .subscribe(() => this.router.navigate(['/login']));
  }
}
