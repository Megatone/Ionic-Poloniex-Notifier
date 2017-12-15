export class PairModel {

  public _id: string;
  public main: string;
  public tag: string;
  public favorite: boolean;
  public lastPrice: number;
  public actualPrice: number;

  constructor(pair: any = {}) {
    const _this = pair ? <PairModel>pair : <PairModel>{};
    this._id = _this._id ? _this._id : '';
    this.main = _this.main ? _this.main : '';
    this.tag = _this.tag ? _this.tag : '';
    this.favorite = this.isFavorite();
    this.lastPrice = this.getLastPrice();
  }

  public isFavorite(): boolean {
    let pair = JSON.parse(localStorage.getItem(this.tag));
    return (pair !== null) ? pair.favorite : false;
  }

  public getLastPrice(): number {
    let pair = JSON.parse(localStorage.getItem(this.tag));
    return (pair !== null) ? pair.lastPrice : 0;
  }

  public setActualPrice(actualPrice: number): PairModel {
    this.actualPrice = actualPrice;
    localStorage.setItem(this.tag, JSON.stringify(this));
    return this;
  }
  public setLastPrice():void{
    this.lastPrice = this.actualPrice;
    localStorage.setItem(this.tag, JSON.stringify(this));
  }

  public setUnsetFavorite(): void {
    this.favorite = !this.favorite;
    localStorage.setItem(this.tag, JSON.stringify(this));
  }

}
