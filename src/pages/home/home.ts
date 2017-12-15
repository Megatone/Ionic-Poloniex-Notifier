import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SocketService } from '../../services/socket.service';
import { DeviceModel } from '../../models/device.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    SocketService
  ]
})
export class HomePage {

  public title: String = 'Poloniex Notifier';
  public socketService: SocketService;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.socketService = this.navParams.get('socketService');
  }
}
