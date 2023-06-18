import { Component } from '@angular/core';
import { UserService } from 'app/core/services/user.service';
import { SessionUser } from 'app/models/session-user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'mds-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public readonly isLoggedIn$: Observable<boolean> = this.userService.isLoggedIn$;
  public readonly currentUser$: Observable<SessionUser | undefined> = this.userService.currentUser$;

  constructor(private readonly userService: UserService) {}

  public logout() {
    this.userService.logout().subscribe();
  }
}
