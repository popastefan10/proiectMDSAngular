import { FormControl } from "@angular/forms";

export interface LoginFormType {
  email: FormControl<string>;
  password: FormControl<string>;
}

export interface LoginType {
  email: string;
  password: string;
}
