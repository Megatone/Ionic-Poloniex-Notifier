import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

//Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CurrencyPage } from '../pages/currency/currency';
import { MenuCurrency } from '../pages/currency/menuCurrency';
import { NotificationsPage } from '../pages/notifications/notifications';
import { NotificationPage } from '../pages/notification/notification';
import { CurrencyDetailPage } from '../pages/currencyDetail/currencyDetail';
import { AboutPage } from '../pages/about/about';
import { SettingsPage } from '../pages/settings/settings';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FCM } from '@ionic-native/fcm';
import { Device } from '@ionic-native/device';
import { FavoritePipe } from '../pipes/favorite.pipe';
import { NumberFormatPipe } from '../pipes/formatCurrency.pipe';
import { SearchPipe } from '../pipes/search.pipe';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CurrencyPage,
    NotificationsPage,
    NotificationPage,
    FavoritePipe,
    NumberFormatPipe,
    SearchPipe,
    MenuCurrency,
    CurrencyDetailPage,
    AboutPage,
    SettingsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CurrencyPage,
    NotificationsPage,
    NotificationPage,
    MenuCurrency,
    CurrencyDetailPage,
    AboutPage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FCM
  ]
})
export class AppModule { }
