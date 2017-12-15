import { PairModel } from "./pairs.model";

export class SubscriptionModel {

  public device: string;
  public pair: PairModel;
  public value: number;
  public status: boolean;
  public type: string;
  public lastNotification: number;

  constructor(subscription: any = {}) {
    let _this = subscription ? <SubscriptionModel>subscription : <SubscriptionModel>{};
    this.device = _this.device ? _this.device : '';
    this.pair = _this.pair ? new PairModel(_this.pair) : new PairModel({});
    this.value = _this.value ? _this.value : 0;
    this.status = _this.status ? _this.status : false;
    this.type = _this.type ? _this.type : '';
    this.lastNotification = _this.lastNotification ? _this.lastNotification : 0;
  }

}
