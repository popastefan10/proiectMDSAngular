import { Component, Input } from '@angular/core';

@Component({
  selector: 'mds-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss']
})
export class UsernameComponent {
  @Input() username?: string;
  @Input() userId?: string;

  constructor() {}
}
