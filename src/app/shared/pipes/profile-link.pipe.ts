import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'profileLink'
})
export class ProfileLinkPipe implements PipeTransform {
  transform(value: string | undefined, ...args: unknown[]): string {
    return !!value ? '/profile/' + value : '/';
  }
}
