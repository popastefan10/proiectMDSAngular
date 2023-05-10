import { Component, Input } from '@angular/core';
import { Postare } from './postare.model';


@Component({
   selector: 'mds-postare',
   templateUrl: './postare.component.html',
   styleUrls: ['./postare.component.scss'],
})

export class PostareComponent {
   @Input() postare: Postare = {
      description: '',
      urls: []
   };

   urlIndex = 0;

   nextImage() {
      this.urlIndex = (this.urlIndex + 1) % this.postare.urls.length;
   }

   prevImage() {
      this.urlIndex = (this.urlIndex - 1 + this.postare.urls.length) % this.postare.urls.length;
   }
}