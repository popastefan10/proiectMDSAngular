import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'app/core/services/user.service';
import { LoginFormType, LoginType } from './login.type';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { CustomError, ErrorResponse } from 'app/shared/utils/error';
import { animate, style, transition, trigger } from '@angular/animations';

const closedStyle = { opacity: 0, height: 0, marginBottom: 0, marginTop: 0 };
const openStyle = { opacity: 1, height: '*', marginBottom: '*', marginTop: '*' };

@Component({
  selector: 'mds-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  animations: [
    trigger('closedOpen', [
      transition(':enter', [style(closedStyle), animate('250ms', style(openStyle))]),
      transition(':leave', [style(openStyle), animate('250ms', style(closedStyle))])
    ])
  ]
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
