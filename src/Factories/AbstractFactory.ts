import {Constructor} from "@/Helpers/Constructor";
import {IWithCreator} from "@/Utils/IWithCreator";

export interface IAbstractFactoryItem<T = any> {
  item: T;
  creator: Constructor<T>;
}

export default abstract class AbstractFactory<T extends IAbstractFactoryItem> {
  protected abstract _list: T[];

  protected createList(withCreator: IWithCreator[]): T[] {
    const items: T[] = [];

    for (let item of withCreator) {
      //@ts-ignore
      items.push({
        item: new item.creator(),
        creator: item.creator,
      });
    }

    return items;
  }

  public get list() {
    return this._list;
  }
}
