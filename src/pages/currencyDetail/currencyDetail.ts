import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { SocketService } from '../../services/socket.service';
import { DeviceModel } from '../../models/device.model';
import { PairModel } from '../../models/pairs.model';
import { TickModel } from '../../models/tick.model';
import { SubscriptionModel } from '../../models/subscription.model';

@Component({
  selector: 'page-currencyDetail',
  templateUrl: 'currencyDetail.html',
  providers: [
    SocketService
  ]
})
export class CurrencyDetailPage {

  public title: String;
  public socketService: SocketService;
  public pair: PairModel;
  public tick: TickModel;
  public subscriptions: Array<SubscriptionModel>
  public subscriptionPriceGT: SubscriptionModel;
  public subscriptionPriceLT: SubscriptionModel;
  public subscriptionPercentGT: SubscriptionModel;
  public subscriptionPercentLT: SubscriptionModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController
  ) {
    this.socketService = this.navParams.get('socketService');
    this.pair = this.navParams.get('pair');
    this.tick = this.socketService.ticks.filter(t => t.currencyPair === this.pair.tag)[0];
    this.title = this.pair.main + ' > ' + this.pair.tag.split('_')[1];
    this.loadSubscriptions();
  }


  loadSubscriptions(): void {
    this.subscriptions = this.socketService.getSubscriptionsByPair(this.pair);
    this.subscriptionPriceGT = this.loadSubscription('$>');
    this.subscriptionPriceLT = this.loadSubscription('$<');
    this.subscriptionPercentGT = this.loadSubscription('%>');
    this.subscriptionPercentLT = this.loadSubscription('%<');
  }

  loadSubscription(type: string): SubscriptionModel {
    let subscription = this.subscriptions.filter(s => s.type === type)[0];
    return subscription ? subscription : new SubscriptionModel({ pair: this.pair, device: this.socketService.device._id, value: 0, status: false, lastNotification: 0, type: type });
  }

  ngOnInit(): void {
  /*   this.socketService.removeListenerTicks();
    this.socketService.subscribeTicks().subscribe((ticks) => {
      this.tick = ticks.filter(t => t.currencyPair === this.pair.tag)[0];
    }); */
  }

  setUnsetFavoritePair() {
    this.tick.pair.setUnsetFavorite();
  }

  valueSubcriptionChanged(subscription: SubscriptionModel): void {
    this.saveSubscription(subscription);
  }

  statusSubcriptionChanged(subscription: SubscriptionModel): void {
    this.saveSubscription(subscription);
  }

  saveSubscription(subscription: SubscriptionModel): void {
    this.socketService.saveSubscription(subscription).subscribe((result) => {
      let toast = this.toastCtrl.create({
        message: result.message,
        duration: 3000,
        cssClass: 'toast-' + result.type,
        showCloseButton: true,
        closeButtonText: 'OK'
      });
      toast.present();
    });
  }
}
