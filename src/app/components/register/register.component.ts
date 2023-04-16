import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'mds-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public readonly registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  public ngOnInit(): void {}

  public onSubmit(): void {
    console.log('Register with the following credentials:');
    console.log('email:', this.registerForm.controls.email.value);
    console.log('password:', this.registerForm.controls.password.value);
  }
}
