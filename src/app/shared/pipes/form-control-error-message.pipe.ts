import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';

@Pipe({
  name: 'formControlErrorMessage'
})
export class FormControlErrorMessagePipe implements PipeTransform {
  transform(value: FormControl, ...args: unknown[]): string {
    if (value.hasError('required')) {
      return 'This field is required';
    }

    return value.hasError('email') ? 'Not a valid email' : '';
  }
}
