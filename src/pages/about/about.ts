import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [
  ]
})

export class AboutPage {

  public title: String = 'About Poloniex Notifier';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

}
