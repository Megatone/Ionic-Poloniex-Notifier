import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SocketService } from '../../services/socket.service';
import { DeviceModel } from '../../models/device.model';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  providers: [
  ]
})

export class SettingsPage {

  public title: String = 'Settings';
  public socketService: SocketService;
  public device: DeviceModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.socketService = this.navParams.get('socketService');
    this.device = this.socketService.device;
  }

  saveChanges(): void {
    this.device.saveRefreshOnLocal();
    this.device.saveNotificationStatusOnLocal();
    this.socketService.registerDeviceData().subscribe((device) => {
      this.device = device;
    });
  }

}
