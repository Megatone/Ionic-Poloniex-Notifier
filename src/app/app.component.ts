import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FCM } from '@ionic-native/fcm';
import { Device } from '@ionic-native/device';
import { DeviceModel } from '../models/device.model';
import { SocketService } from '../services/socket.service';
import { HomePage } from '../pages/home/home';
import { CurrencyPage } from '../pages/currency/currency';
import { NotificationsPage } from '../pages/notifications/notifications';
import { NotificationPage } from '../pages/notification/notification';
import { TickModel } from '../models/tick.model';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { SubscriptionModel } from '../models/subscription.model';
import { SettingsPage } from '../pages/settings/settings';
import { AboutPage } from '../pages/about/about';

@Component({
  templateUrl: 'app.html',
  styleUrls: [

  ],
  providers: [
    Device,
    SocketService
  ]
})
export class MyApp implements OnInit {

  @ViewChild(Nav) nav: Nav;

  public rootPage: any;
  public pages: Array<{ title: string, component: any, icon: string, ionIcon: boolean }>;
  public deviceModel: DeviceModel;
  public ticks: Array<TickModel>;
  public subscriptions: Array<SubscriptionModel>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private fcm: FCM,
    private device: Device,
    private socketService: SocketService

  ) {
    this.socketService.initSocket();
    this.initializeApp();

    this.pages = [
      { title: 'HOME', component: HomePage, icon: 'home', ionIcon: true },
      { title: 'BTC', component: CurrencyPage, icon: 'cc BTC', ionIcon: false },
      { title: 'ETH', component: CurrencyPage, icon: 'cc ETH', ionIcon: false },
      { title: 'XMR', component: CurrencyPage, icon: 'cc XMR', ionIcon: false },
      { title: 'USDT', component: CurrencyPage, icon: 'cc USDT', ionIcon: false },
      { title: 'NOTIFICATIONS', component: NotificationsPage, icon: 'notifications', ionIcon: true },
      { title: 'SETTINGS', component: SettingsPage, icon: 'settings', ionIcon: true },
      { title: 'ABOUT', component: AboutPage, icon: 'information-circle', ionIcon: true }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.fcm.getToken().then(token => {
        this.socketService.device.token = token;
        this.socketService.device.uuid = this.device.uuid;
        this.socketService.registerDeviceData().subscribe((device) => {
          this.socketService.getSubscriptions();
        });
      }).catch(err => {
        this.socketService.device.token = 'token_web';
        this.socketService.device.uuid = 'uuid_device_web';
        this.socketService.registerDeviceData().subscribe((device) => {
          this.socketService.getSubscriptions();
        });
      });

      this.fcm.onTokenRefresh().subscribe(token => {
        this.socketService.device.token = token;
        this.socketService.device.uuid = this.device.uuid;
        this.socketService.registerDeviceData().subscribe((device) => {
          this.socketService.getSubscriptions();
        });
      }, err => {
        console.log(err);
      });

      this.fcm.onNotification().subscribe(data => {
        if (data.wasTapped) {
          alert("Received in background");
        } else {
          alert("Received in foreground");
        };
      }, err => {
        console.log(err);
      });
    });
  }

  ngOnInit(): void {
    this.openPage(this.pages[0]);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component, { title: page.title, socketService: this.socketService });
  }
}
