import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'mds-profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.scss']
})
export class ProfilePicComponent implements OnChanges {
  @Input() pictureSrc?: string;
  @Input() imgSize: string = '32px';
  public displayProfilePicure: boolean = true;

  constructor() {}

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['pictureSrc']) {
      this.displayProfilePicure = true;
    }
  }

  public onImgError(_event: any): void {
    this.displayProfilePicure = false;
  }
}
