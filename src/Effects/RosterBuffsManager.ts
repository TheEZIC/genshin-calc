import Character from "@/Characters/Character";
import Effect from "./Effect";

export interface ICharacterBuffItem {
  character: Character;
  buff: Effect;
}

export default class RosterBuffsManager {
  private _charactersBuffs: ICharacterBuffItem[] = [];

  public addCharacterBuff(buffItem: ICharacterBuffItem) {
    this._charactersBuffs.push(buffItem);
  }

  public removeCharacterBuff(buffItem: ICharacterBuffItem) {
    this._charactersBuffs = this._charactersBuffs.filter((item) => {
      return item.buff.name !== buffItem.buff.name
        && item.character.name !== buffItem.character.name;
    });
  }

  private _rosterBuffs: Effect[] = [];

  public addRosterBuff(buff: Effect) {
    this._rosterBuffs.push(buff);
  }

  public removeRosterBuff(buff: Effect) {
    this._rosterBuffs = this._rosterBuffs.filter((item) => {
      return item.name !== buff.name;
    });
  }

  public get allRosterBuffs() {
    return this._rosterBuffs;
  }
}
