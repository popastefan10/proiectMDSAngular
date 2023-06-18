import { trigger, transition, style, animate } from '@angular/animations';

const closedStyle = { opacity: 0, height: 0, marginBottom: 0, marginTop: 0 };
const openStyle = { opacity: 1, height: '*', marginBottom: '*', marginTop: '*' };

export const openClosedAnimation = trigger('openClosed', [
  transition(':enter', [style(closedStyle), animate('250ms', style(openStyle))]),
  transition(':leave', [style(openStyle), animate('250ms', style(closedStyle))])
]);
