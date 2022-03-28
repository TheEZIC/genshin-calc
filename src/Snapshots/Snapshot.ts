export interface ISnapshotItem<T> {
  hash: string;
  value: T;
}

export default class Snapshot<T> {
  private _items: ISnapshotItem<T>[] = [];

  public add(item: ISnapshotItem<T>): void {
    this._items.push(item);
  }

  public remove(hash: string) {
    this._items = this._items.filter(item => item.hash !== hash);
  }

  public get(hash: string): ISnapshotItem<T> | undefined {
    return this._items.find(item => item.hash === hash);
  }

  public clear() {
    this._items = [];
  }
}
