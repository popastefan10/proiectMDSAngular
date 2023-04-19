import { FormControl } from "@angular/forms";

export interface RegisterFormType {
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}

export interface RegisterType {
  email: string;
  password: string;
}
