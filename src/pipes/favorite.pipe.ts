import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { TickModel } from '../models/tick.model';

@Pipe({
  name: 'favorite',
  pure: false
})

@Injectable()
export class FavoritePipe implements PipeTransform {
  transform(items: any, orderType: string): any {
    switch (orderType) {
      case 'AZ':
        return items.sort(function (a, b) {
          return a.pair.favorite !== b.pair.favorite ? b.pair.favorite === true ? 1 : -1 : a.currencyPair.localeCompare(b.currencyPair);
        })
      case '%':
        return items.sort((a: TickModel, b: TickModel) => {
          return a.pair.favorite !== b.pair.favorite ? b.pair.favorite === true ? 1 : -1 : b.percentChange - a.percentChange;
        });
      case '$':
        return items.sort((a: TickModel, b: TickModel) => {
          return a.pair.favorite !== b.pair.favorite ? b.pair.favorite === true ? 1 : -1 : b.lastPrice - a.lastPrice
        });
      default:
        return items.sort((a, b) => {
          return a.pair.favorite !== b.pair.favorite ? b.pair.favorite === true ? 1 : -1 : a.currencyPair.localeCompare(b.currencyPair);
        });
    }
  };
};
