import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandK',
})
export class ThousandKPipe implements PipeTransform {
  transform(value: number): string {
    if (value >= 1000) {
      const thousands = value / 1000;
      if (Number.isInteger(thousands)) {
        return thousands.toString() + 'K';
      } else {
        return thousands.toFixed(1).replace(/\.0$/, '') + 'K';
      }
    }
    return value.toString();
  }
}
