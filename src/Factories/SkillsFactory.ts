import AbstractFactory, {IAbstractFactoryItem} from "@/Factories/AbstractFactory";
import Skill from "@/Skills/Skill";
import CharactersFactory from "@/Factories/CharactersFactory";

export interface ISkillFactoryItem extends IAbstractFactoryItem<Skill> {
}

export default class SkillsFactory extends AbstractFactory<ISkillFactoryItem> {
  private static _instance: SkillsFactory | null = null;

  public static get instance() {
    if (!this._instance) {
      this._instance = new this();
    }

    return this._instance;
  }

  protected _list: ISkillFactoryItem[] = this.createList(
    new CharactersFactory()
      .list
      .map(c => c.item.skillManager.allSkills)
      .flat(1)
  );
}
