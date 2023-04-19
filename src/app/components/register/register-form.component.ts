import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'app/core/services/user.service';
import { RegisterFormType, RegisterType } from './register.type';
import { Router } from '@angular/router';

@Component({
  selector: 'mds-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  constructor(private readonly fb: FormBuilder, private readonly userService: UserService, public router: Router) {}

  public readonly registerForm: FormGroup<RegisterFormType> = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  public ngOnInit(): void {}

  public onSubmit(): void {
    this.userService.register(this.registerForm.value as RegisterType).subscribe(() => this.router.navigateByUrl('/'));
  }

  public get email(): FormControl {
    return this.registerForm.controls.email;
  }

  public get password(): FormControl {
    return this.registerForm.controls.password;
  }
}
