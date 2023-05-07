import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from 'app/core/services/profile.service';
import { CustomError, ErrorResponse } from 'app/shared/utils/error';
import { ProfileCreate } from 'app/models/profile-create.model';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-create-profile-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {
  constructor(private readonly fb: FormBuilder, private readonly profileService: ProfileService, public router: Router) {}

  public createProfileError: CustomError | undefined;

  public profilePicture?: File = undefined;

  // Cum folosesc interfata createProfileFormType?
  public readonly profileForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
    bio: ['', Validators.maxLength(50)]
  });


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

      this.profileService
        .create(data)
        .pipe(
          map(() => true),
          catchError((err: ErrorResponse) => {
            this.createProfileError = err.error.error;
            return of(false);
          })
        )
        .subscribe((createProfileSuccessful) => createProfileSuccessful && this.router.navigateByUrl('/'));
    }
  }


  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.profilePicture = target.files[0];
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
