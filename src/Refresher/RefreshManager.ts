interface IRefreshItem {
  key: string;
  value: any;
}

export default class RefreshManager {
  private static _items = new Map<InstanceType<any>, IRefreshItem[]>();

  public static add(instance: InstanceType<any>, key: string, value: number) {
    const exist = this._items.get(instance);
    const backupItem = {key, value};

    if (!exist) {
      this._items.set(instance, [backupItem]);
    } else {
      this._items.set(instance, [...exist, backupItem]);
    }
  }

  public static refreshAll() {
    for (let [instance, backupItems] of this._items.entries()) {
      for (let item of backupItems) {
        instance[item.key] = item.value;
      }
    }
  }

  public static refreshSingle(instance: InstanceType<any>, key: string) {
    for (let [_instance, backupItems] of this._items.entries()) {
      if (_instance === instance) {
        const item = backupItems.find(i => i.key === key);
        if (!item) return;
        instance[item.key] = item.value;
      }
    }
  }
}
