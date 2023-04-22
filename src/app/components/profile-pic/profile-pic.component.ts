import { Component, Input } from '@angular/core';

@Component({
  selector: 'mds-profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.scss']
})
export class ProfilePicComponent {
  @Input() pictureSrc?: string;

  constructor() {}
}
