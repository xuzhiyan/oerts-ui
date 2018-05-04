import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'strLength'})
export class StrLengthPipe implements PipeTransform {
  transform(value: string, length: number): string {
    return value.substring(0, length);
  }

}
