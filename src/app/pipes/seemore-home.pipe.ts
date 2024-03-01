import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seemoreHome'
})
export class SeemoreHomePipe implements PipeTransform {

  transform(value: string, limit=5): string {
    return value.split(' ').splice(0,limit).join(' ');
  }

}
