import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  template: `
    <ion-list>
      <ion-list-header>Order By</ion-list-header>
      <button ion-item (click)="setOrder('AZ')">A-Z</button>
      <button ion-item (click)="setOrder('%')">Percentaje</button>
      <button ion-item (click)="setOrder('$')">Price</button>
    </ion-list>
  `
})
export class MenuCurrency {
  constructor(public viewCtrl: ViewController) { }

  setOrder(orderType: string) {
    this.viewCtrl.dismiss(orderType);
  }
}
