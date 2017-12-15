import { PairModel } from "./pairs.model";
import * as $ from 'jquery';

export class TickModel {
  public pair: PairModel;
  public currencyPair: string;
  public lastPrice: number;
  public lowestAsk: number;
  public highestBid: number;
  public percentChange: number;
  public baseVolume: number;
  public quoteVolume: number;
  public isFrozen: Boolean
  public high24: number;
  public low24: number;
  public timestamp: number;

  constructor(tick: any = {}) {
    let _this = tick ? <TickModel>tick : <TickModel>{};
    this.currencyPair = _this.currencyPair ? _this.currencyPair : '';
    this.lastPrice = _this.lastPrice ? _this.lastPrice : 0;
    this.lowestAsk = _this.lowestAsk ? _this.lowestAsk : 0;
    this.highestBid = _this.highestBid ? _this.highestBid : 0;
    this.percentChange = _this.percentChange ? _this.percentChange : 0;
    this.baseVolume = _this.baseVolume ? _this.baseVolume : 0;
    this.quoteVolume = _this.quoteVolume ? _this.quoteVolume : 0;
    this.isFrozen = _this.isFrozen ? true : false;
    this.high24 = _this.high24 ? _this.high24 : 0;
    this.low24 = _this.low24 ?_this.low24 : 0;
    this.timestamp = _this.timestamp ? _this.timestamp : 0;
  }

}
