import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { openClosedAnimation } from "app/animations";
import { CustomError } from "app/shared/utils/error";
import { Router } from '@angular/router';
import { ProfileService } from "app/core/services/profile.service";
import { ProfileCreate } from "app/models/profile-create.model";
import { EditProfileFormType } from "./edit-profile.type";
import { Profile } from "app/models/profile.model";
import { GenericResponse } from "app/models/generic-response.model";

@Component({
  selector: 'mds-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  animations: [openClosedAnimation]
})
export class EditProfileComponent implements OnInit {
  selectedPhotoUrl = "";
  selectedPhotoName = "";

  constructor(private readonly fb: FormBuilder, private readonly profileService: ProfileService, public router: Router) {}

  public editProfileError: CustomError | undefined;

  public profilePicture?: File = undefined;

  public readonly profileForm: FormGroup<Partial<EditProfileFormType>> = this.fb.group({
    username: ['', [Validators.minLength(5), Validators.maxLength(15)]],
    name: ['', [Validators.minLength(5), Validators.maxLength(15)]],
    bio: ['', Validators.maxLength(50)]
  }) as FormGroup<Partial<EditProfileFormType>>;

  onSubmit(): void {
    if (this.profileForm.valid) {
      const data: ProfileCreate = {
        metadata: {
          username: this.username.value,
          name: this.name.value,
          bio: this.bio.value
        },
        media: this.profilePicture
      }

      this.profileService.patch(data)
        .subscribe((res: GenericResponse<Partial<Profile>>) => {
          if (res.error) {
            console.log(res.error);
          } else {
            console.log(res.content);
            this.profileForm.reset();
          }
        });
    }
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      const file = target.files[0];
      this.profilePicture = file;
      this.selectedPhotoName = file.name;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.selectedPhotoUrl = reader.result as string; 
      };
    }
  }

  get username(): FormControl {
    return this .profileForm.get('username') as FormControl;
  }

  get name(): FormControl {
    return this.profileForm.get('name') as FormControl;
  }

  get bio(): FormControl {
    return this.profileForm.get('bio') as FormControl;
  }

  ngOnInit(): void {}
}
