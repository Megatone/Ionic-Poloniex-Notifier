import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatCurrency' })

export class NumberFormatPipe implements PipeTransform {
  transform(value: string, decimals: number): string {
    if (!value) {
      return '0';
    }
    return parseFloat(value).toFixed(decimals).replace(',', '');
  }
}
