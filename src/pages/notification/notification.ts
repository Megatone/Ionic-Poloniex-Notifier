import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html'
})

export class NotificationPage {

  public title: String = 'Notification';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

}
