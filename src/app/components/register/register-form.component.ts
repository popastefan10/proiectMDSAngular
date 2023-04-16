import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'mds-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  constructor() {}

  public readonly registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  public ngOnInit(): void {}

  public onSubmit(): void {
    console.log('Register with the following credentials:');
    console.log('email:', this.registerForm.controls.email.value);
    console.log('password:', this.registerForm.controls.password.value);
  }

  public get email(): FormControl {
    return this.registerForm.controls.email;
  }

  public get password(): FormControl {
    return this.registerForm.controls.password;
  }
}
