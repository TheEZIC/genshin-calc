import AbstractFactory, {IAbstractFactoryItem} from "@/Factories/AbstractFactory";
import Character from "@/Entities/Characters/Character";
import Ayaka from "@/Lists/Charaters/Ayaka/Ayaka";
import Xiangling from "@/Lists/Charaters/Xiangling/Xiangling";

export interface ICharactersFactoryItem extends IAbstractFactoryItem<Character> {
}

export default class CharactersFactory extends AbstractFactory<ICharactersFactoryItem> {
  private static _instance: CharactersFactory | null = null;

  public static get instance() {
    if (!this._instance) {
      this._instance = new this();
    }

    return this._instance;
  }

  protected _list: ICharactersFactoryItem[] = this.createList([
    new Ayaka(),
    new Xiangling(),
  ])

  public getByName(name: string): ICharactersFactoryItem | undefined {
    const listItem = this._list.find(listItem => listItem.item.title === name);

    if (!listItem) {
      return;
    }

    return {
      item: new listItem.creator(),
      creator: listItem.creator,
    }
  }
}
