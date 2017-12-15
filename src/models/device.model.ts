

export class DeviceModel {

  public _id: string;
  public uuid: string;
  public token: string;
  public refresh: string;
  public notificationStatus: boolean;

  constructor(device: any = {}) {
    this.load(device);
  }

  private load(device: any = {}): DeviceModel {
    const _this = <DeviceModel>device;
    this._id = _this._id ? _this._id : '';
    this.uuid = _this.uuid ? _this.uuid : '';
    this.token = _this.token ? _this.token : '';
    this.refresh = _this.refresh ? _this.refresh : this.loadRefreshFromLocal();
    this.notificationStatus = _this.notificationStatus ? _this.notificationStatus : this.loadNotificationStatusFromLocal();
    return this;
  }

  private loadRefreshFromLocal(): string {
    let refresh = localStorage.getItem('refresh');
    return refresh ? refresh : '2';
  }
  private loadNotificationStatusFromLocal(): boolean {
    let notificationStatus = localStorage.getItem('notificationStatus');
    return notificationStatus === 'true' ? true : false;
  }

  public saveRefreshOnLocal(): void {
    localStorage.setItem('refresh', this.refresh);
  }

  public saveNotificationStatusOnLocal(): void {
    localStorage.setItem('notificationStatus', this.notificationStatus.toString());
  }

}
