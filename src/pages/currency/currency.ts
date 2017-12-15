import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, PopoverController } from 'ionic-angular';
import { TickModel } from '../../models/tick.model';
import { SocketService } from '../../services/socket.service';
import { PairModel } from '../../models/pairs.model';
import { MenuCurrency } from './menuCurrency';
import { CurrencyDetailPage } from '../currencyDetail/currencyDetail';

@Component({
  selector: 'page-currency',
  templateUrl: 'currency.html',
  animations: []
})

export class CurrencyPage {

  public title: string = 'Currency';
  public ticks: Array<TickModel> = [];
  public socketService: SocketService;
  public loading: any;
  public orderType: string;
  private connection: any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public popoverCtrl: PopoverController
  ) {
    this.title = this.navParams.get('title');
    this.orderType = this.getOrderTypeFromLocalStorage();
    this.socketService = this.navParams.get('socketService');
    this.ticks = this.filterTicks(this.socketService.ticks);
    if (this.ticks.length === 0) {
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loading.present();
    }
  }

  ionViewDidEnter(): void {
    this.connection = this.socketService.getTicks(this.title).subscribe(ticks => {
      this.ticks = this.filterTicks(ticks);
      if (this.loading && this.loading._state < 4) {
        this.loading.dismiss();
      }
    });
  }

  ionViewWillLeave(): void {
    this.connection.unsubscribe();
  }


  filterTicks(ticks: Array<TickModel>): Array<TickModel> {
    return ticks.filter((tick: TickModel) => tick.pair.main === this.title);
  }

  setUnsetFavoritePair(pair: PairModel) {
    pair.setUnsetFavorite();
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(MenuCurrency);

    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(orderType => {
      this.setOrderByTypeToLocalStorage(orderType);
    });
  }

  getOrderTypeFromLocalStorage(): string {
    let orderType = localStorage.getItem('OrderType');
    return orderType ? orderType : 'AZ';
  }

  setOrderByTypeToLocalStorage(orderType: string): void {
    this.orderType = orderType ? orderType : 'AZ';
    localStorage.setItem('OrderType', this.orderType);
  }

  openCurrencyDetailPage(pair): void {
    this.navCtrl.push(CurrencyDetailPage, {
      socketService: this.socketService,
      pair: pair
    });
  }
}
