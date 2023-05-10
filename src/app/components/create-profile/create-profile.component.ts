import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from 'app/core/services/profile.service';
import { CustomError } from 'app/shared/utils/error';
import { ProfileCreate } from 'app/models/profile-create.model';
import { GenericResponse } from 'app/models/generic-response.model';
import { Profile } from 'app/models/profile.model';
import { CreateProfileFormType } from './create-profile.type';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-create-profile-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;
  selectedPhotoUrl =  "";
  selectedPhotoName =  "";

  constructor(private readonly fb: FormBuilder, private readonly profileService: ProfileService, public router: Router) {}

  public createProfileError: CustomError | undefined;

  public profilePicture?: File = undefined;

  public readonly profileForm: FormGroup<Partial<CreateProfileFormType>> = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
    bio: ['', Validators.maxLength(50)]
  }) as FormGroup<Partial<CreateProfileFormType>>;


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

      this.profileService.create(data)
        .subscribe((res: GenericResponse<Partial<Profile>>) => {
          if (res.error) {
            console.log(res.error);
          } else {
            console.log(res.content);
            this.router.navigateByUrl('/');
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

  resetForm() {
    this.selectedPhotoUrl = "";
    this.selectedPhotoName = "";
    this.stepper.reset();
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
