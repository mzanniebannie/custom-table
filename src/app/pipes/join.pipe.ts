import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join',
})
export class JoinPipe implements PipeTransform {
  transform(input: string[], sep = ' | '): string {
    return input.join(sep);
  }
}
