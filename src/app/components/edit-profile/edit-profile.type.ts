import { FormControl } from "@angular/forms";

export interface EditProfileFormType {
  username?: FormControl<string>;
  name?: FormControl<string>;
  bio?: FormControl<string>;
}
