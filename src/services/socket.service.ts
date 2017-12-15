import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import * as io from 'socket.io-client';
import { TickModel } from '../models/tick.model';
import { PairModel } from '../models/pairs.model';
import { DeviceModel } from '../models/device.model';
import { SubscriptionModel } from '../models/subscription.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SocketService {

  public socket;
  public ticks: Array<TickModel>;
  public device: DeviceModel;
  public subscriptions: Array<SubscriptionModel>;

  constructor() {
    this.ticks = [];
    this.subscriptions = [];
    this.device = new DeviceModel();
  }

  initSocket() {
    this.socket = io(GLOBAL.SOCKET_URL);
  }

  public getTicks(pair): Observable<any> {
    this.socket.emit('join-channel', 'channel-' + this.device.refresh + '-' + pair);
    return new Observable(observer => {
      this.socket.on('ticks', (ticks) => {
        for (let i = 0; i <= this.ticks.length - 1; i++) {
          this.ticks[i].pair.setLastPrice();
        }
        for (let i = 0; i <= ticks.length - 1; i++) {
          try {
            let pair = new PairModel(ticks[i].pair);
            ticks[i] = new TickModel(ticks[i]);
            ticks[i].pair = pair.setActualPrice(ticks[i].lastPrice);
          } catch (err) {
            console.log(err.stack);
            console.log("indice " + i);
          }
        }
        this.ticks = ticks;
        observer.next(this.ticks);
      });
      return () => {
        this.socket.removeListener('ticks');
      };
    });
  }

  public registerDeviceData(): Observable<any> {
    return new Observable(observer => {
      this.socket.emit('register-device-data', this.device);
      this.socket.on('response-register-device-data', (device) => {
        this.device = new DeviceModel(device);
        observer.next(this.device);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }

  public removeListenerDeviceData(): void {
    this.socket.removeListener('response-register-device-data');
  }

  public getSubscriptions(): Array<SubscriptionModel> {
    this.socket.on('response-get-subscriptions', (subscriptions) => {
      this.subscriptions = subscriptions;
      return this.subscriptions;
    });
    this.socket.emit('get-subscriptions', this.device._id);
    return this.subscriptions;
  }

  public getSubscriptionsByPair(pair: PairModel) {
    return this.subscriptions.filter(s => s.pair.tag == pair.tag);
  }

  public saveSubscription(subscription: SubscriptionModel): Observable<any> {
    this.socket.removeListener('response-save-subscription');
    return new Observable(observer => {
      this.socket.on('response-save-subscription', (result) => {
        this.socket.removeListener('response-save-subscription');
        observer.next(result);
      });
      this.socket.emit('save-subscription', subscription);
    });
  }

}
