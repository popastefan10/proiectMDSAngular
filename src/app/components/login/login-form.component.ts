import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'mds-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  constructor() {}

  public readonly loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  public ngOnInit(): void {}

  public onSubmit(): void {
    console.log('Login with the following credentials:');
    console.log('email:', this.loginForm.controls.email.value);
    console.log('password:', this.loginForm.controls.password.value);
  }

  public get email(): FormControl {
    return this.loginForm.controls.email;
  }

  public get password(): FormControl {
    return this.loginForm.controls.password;
  }

  public getErrorMessage(formControl: FormControl) { // TODO replace with pipe for better performance
    console.log('getErrorMessage');
    if (formControl.hasError('required')) {
      return 'This field is required';
    }

    return formControl.hasError('email') ? 'Not a valid email' : '';
  }
}
