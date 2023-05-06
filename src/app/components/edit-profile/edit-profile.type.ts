import { FormControl } from "@angular/forms";

export interface EditProfileFormType {
  username: FormControl<string | null>;
  name: FormControl<string | null>;
  bio: FormControl<string | null | undefined>;
  profilePicture: FormControl<File | null | undefined>;
}

export interface EditProfileType {
  username?: string;
  name?: string;
  bio?: string;
  profilePicture?: File
}
