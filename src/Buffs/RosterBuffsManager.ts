import Character from "@/Characters/Character";
import Buff from "./Buff";

export interface ICharacterBuffItem {
  character: Character;
  buff: Buff;
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

  private _rosterBuffs: Buff[] = [];

  public addRosterBuff(buff: Buff) {
    this._rosterBuffs.push(buff);
  }

  public removeRosterBuff(buff: Buff) {
    this._rosterBuffs = this._rosterBuffs.filter((item) => {
      return item.name !== buff.name;
    });
  }
}