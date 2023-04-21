import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'app/core/services/user.service';
import { LoginFormType, LoginType } from './login.type';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { CustomError, ErrorResponse } from 'app/shared/utils/error';
import { openClosedAnimation } from 'app/animations';

@Component({
  selector: 'mds-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  animations: [openClosedAnimation]
})
export class LoginFormComponent implements OnInit {
  constructor(private readonly fb: FormBuilder, private readonly userService: UserService, public router: Router) {}

  public readonly loginForm: FormGroup<LoginFormType> = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  public loginError: CustomError | undefined;

  public ngOnInit(): void {}

  public onSubmit(): void {
    if (this.loginForm.valid) {
      this.userService
        .login(this.loginForm.value as LoginType)
        .pipe(
          map(() => true),
          catchError((err: ErrorResponse) => {
            this.loginError = err.error.error;

            return of(false);
          })
        )
        .subscribe((loginSuccesful) => loginSuccesful && this.router.navigateByUrl('/'));
    }
  }

  public get email(): FormControl {
    return this.loginForm.controls.email;
  }

  public get password(): FormControl {
    return this.loginForm.controls.password;
  }
}
