import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { openClosedAnimation } from "app/animations";
import { CustomError } from "app/shared/utils/error";
import { EditProfileFormType } from "./edit-profile.type";
import { Router } from '@angular/router';

@Component({
  selector: 'mds-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  animations: [openClosedAnimation]
})
export class EditProfileComponent implements OnInit {
  public selectedPhotoUrl: string | undefined;
  public selectedPhotoName: string | undefined;


  constructor(private readonly fb: FormBuilder, public router: Router) {}

  public readonly editProfileForm: FormGroup<EditProfileFormType> = this.fb.group({
    username: ['', [Validators.minLength(5), Validators.maxLength(10)]],
    name: [''],
    bio: [undefined as string | null | undefined, [Validators.maxLength(20)]],
    profilePicture: [undefined as File | undefined]
  });

  onSubmit() {
  throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  public editProfileError: CustomError | undefined;

  public get username(): FormControl {
    return this.editProfileForm.controls.username;
  }

  public get name(): FormControl {
    return this.editProfileForm.controls.name;
  }

  public get bio(): FormControl {
    return this.editProfileForm.controls.bio;
  }

  public get profilePicture(): FormControl {
    return this.editProfileForm.controls.profilePicture;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const profilePictureControl = this.editProfileForm.get('profilePicture');
      if (profilePictureControl) {
        profilePictureControl.setValue(file);
        this.selectedPhotoName = file.name;
        const reader = new FileReader();
        reader.onload = e => this.selectedPhotoUrl = reader.result!.toString();
        reader.readAsDataURL(file);
      }
    }
  }
}
