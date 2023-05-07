import { FormControl } from "@angular/forms";

export interface CreateProfileFormType {
  username: FormControl<string>,
  name: FormControl<string>,
  bio?: FormControl<string>,
}

