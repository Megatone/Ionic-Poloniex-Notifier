import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { SocketService } from '../../services/socket.service';
import { SubscriptionModel } from '../../models/subscription.model';

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})

export class NotificationsPage {

  public title: String = 'Notifications';
  public socketService: SocketService;
  public subscriptions: Array<SubscriptionModel>;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController
  ) {
    this.socketService = this.navParams.get('socketService');
    this.subscriptions = this.socketService.subscriptions.filter(s => s.status === true);
  }

  subcriptionChanged(subscription: SubscriptionModel): void {
    this.socketService.saveSubscription(subscription).subscribe(result => {
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

  getDescriptionType(subscription: SubscriptionModel): string {
    return subscription.type.substring(0, 1) === '$' ? 'Price' : 'Percent'
  }

  isMoreThanIcon(subscription: SubscriptionModel): boolean {
    return subscription.type.substring(1, 1) === '>' ? true : false;
  }

}
