import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettify',
})
export class PrettifyPipe implements PipeTransform {
  constructor(public datepipe: DatePipe) {}
  transform(
    input: string | string[] | Date | number
  ): string | string[] | Date | number | null {
    switch (typeof input) {
      case 'number':
        return input;
      case 'string':
        try {
          return this.datepipe.transform(input, 'MM/dd/yyyy');
        } catch (ex) {
          return input;
        }
      case 'object':
        return (input as string[]).join(' | ');
    }
  }
}
