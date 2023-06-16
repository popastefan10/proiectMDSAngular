import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'app/core/services/user.service';
import { RegisterFormType, RegisterType } from './register.type';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { CustomError, ErrorResponse } from 'app/shared/utils/error';
import { openClosedAnimation } from 'app/animations';

@Component({
  selector: 'mds-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  animations: [openClosedAnimation]
})
export class RegisterFormComponent implements OnInit {
  constructor(private readonly fb: FormBuilder, private readonly userService: UserService, public router: Router) {}

  public passwordVisible: boolean = false;

  public toggleShow() {
    this.passwordVisible = !this.passwordVisible;
    let x = document.getElementById('password');
    if (x!.getAttribute('type') === 'password') {
      x!.setAttribute('type', 'text');
    }
    else {
      x!.setAttribute('type', 'password');
    }
  }


  public readonly registerForm: FormGroup<RegisterFormType> = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', [Validators.required, this.passwordMatchValidator.bind(this)]]
  });

  public registerError: CustomError | undefined;

  private passwordMatchValidator(control: FormControl): { [key: string]: boolean } | null {
    const password = this.registerForm?.controls.password?.value;
    const confirmPassword = control.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }

  public ngOnInit(): void {}

  public onSubmit(): void {
    if (this.registerForm.valid) {
      this.userService
        .register(this.registerForm.value as RegisterType)
        .pipe(
          map(() => true),
          catchError((err: ErrorResponse) => {
            this.registerError = err.error.error;

            return of(false);
          })
        )
        .subscribe((registerSuccessful) => registerSuccessful && this.router.navigateByUrl('/create-profile'));
    }
  }

  public get email(): FormControl {
    return this.registerForm.controls.email;
  }

  public get password(): FormControl {
    return this.registerForm.controls.password;
  }

  public get confirmPassword(): FormControl {
    return this.registerForm.controls.confirmPassword;
  }
}
