import { Component } from '@angular/core';
import { UserService } from 'app/core/services/user.service';
import { Observable, throwError } from 'rxjs';
import {Router, Routes} from '@angular/router';
import { catchError } from 'rxjs/operators';
import { SessionUser } from 'app/models/session-user.model';
import { handleError } from 'app/shared/utils/error';
import {ApiTestsComponent} from "../api-tests/api-tests.component";
import {LoginFormComponent} from "../login/login-form.component";
import {RegisterFormComponent} from "../register/register-form.component";
import {CreatePostComponent} from "../post/create-post/create-post.component";
import {IsLoggedInGuard} from "../../shared/guards/is-logged-in.guard";
import {PostPageComponent} from "../post-page/post-page.component";
import {CreateProfileComponent} from "../create-profile/create-profile.component";
import {EditProfileComponent} from "../edit-profile/edit-profile.component";
import {FeedComponent} from "../feed/feed.component";
import {ShowProfileComponent} from "../show-profile/show-profile.component";

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

  private routs: Routes = [
    { path: 'api-tests', component: ApiTestsComponent },
    { path: 'login', component: LoginFormComponent },
    { path: 'register', component: RegisterFormComponent },
    { path: 'posts/create', component: CreatePostComponent, canActivate: [IsLoggedInGuard] },
    { path: 'posts/:id', component: PostPageComponent },
    { path: 'create-profile', component: CreateProfileComponent, canActivate: [IsLoggedInGuard] },
    { path: 'edit-profile', component: EditProfileComponent, canActivate: [IsLoggedInGuard] },
    { path: 'feed', component: FeedComponent, canActivate: [IsLoggedInGuard] },
    { path: 'posts/:id', component: PostPageComponent },
    { path: 'profile/:userId', component: ShowProfileComponent },
    { path: '', redirectTo: '/feed', pathMatch: 'full' },
  ];

  public logout() {
    this.userService.logout().subscribe();

    this.userService
      .logout()
      .pipe(catchError(handleError()))
      .subscribe(() => this.router.navigate(['/']));
  }

}
