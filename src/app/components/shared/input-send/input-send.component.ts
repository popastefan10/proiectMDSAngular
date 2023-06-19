import { Component, EventEmitter, Input, Output, HostBinding } from '@angular/core';

@Component({
  selector: 'mds-input-send',
  templateUrl: './input-send.component.html',
  styleUrls: ['./input-send.component.scss']
})
export class InputSendComponent {
  private _content: string = '';
  @Input() public get content(): string {
    return this._content;
  }
  public set content(value: string) {
    this._content = value;
    this.contentChange.emit(this._content);
  }
  @Output() contentChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() send: EventEmitter<void> = new EventEmitter<void>();
  @Input() placeholder: string = 'Type something here...';

  @Input() btnSize: string = '32px';

  constructor() {}

  public onSendClick() {
    this.send.emit();
  }
}
