import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'apiPrefix'
})
export class ApiPrefixPipe implements PipeTransform {
  transform(value: string | undefined, ...args: unknown[]): string | undefined {
    return value === undefined ? undefined : '/api/' + value;
  }
}
