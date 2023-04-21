import { Component, Input } from '@angular/core';

@Component({
  selector: 'mds-error-box',
  templateUrl: './error-box.component.html',
  styleUrls: ['./error-box.component.scss']
})
export class ErrorBoxComponent {
  public readonly genericMsg = 'Something went wrong!';

  @Input() public errorMsg: string | undefined;

  constructor() {}
}
