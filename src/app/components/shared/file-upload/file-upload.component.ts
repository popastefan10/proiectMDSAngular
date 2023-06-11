import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mds-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  @Input() message: string = 'No file uploaded yet.';
  @Input() disabled: boolean = false;
  @Input() accept: string = 'image/*';
  @Output() file = new EventEmitter<File>();
  // @Input() displayMessage: boolean = true;

  public onFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.files && target.files.length) {
      this.file.emit(target.files[0]);
      target.value = '';
    } else {
      console.error('Something went wrong with the file upload!');
    }
  }
}
