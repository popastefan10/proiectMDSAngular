import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'mds-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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
}
