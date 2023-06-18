import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'profileLink'
})
export class ProfileLinkPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    return '/profile/' + value;
  }
}
