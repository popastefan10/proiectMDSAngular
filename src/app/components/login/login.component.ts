import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'mds-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public readonly loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  public ngOnInit(): void {}

  public onSubmit(): void {
    console.log('Login with the following credentials:');
    console.log('email:', this.loginForm.controls.email.value);
    console.log('password:', this.loginForm.controls.password.value);
  }
}
