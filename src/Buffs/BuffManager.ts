import Buff from "@/Buffs/Buff";
import Character from "@/Characters/Character";

export default class BuffManager {
  constructor(public character: Character) {}

  private _buffs: Buff[] = [];

  public addBuff(buff: Buff) {
    this._buffs.push(buff);
  }

  public removeBuff(buff: Buff) {
    this._buffs = this._buffs.filter((s) => s.name !== buff.name);
  }

  public get all() {
    return this._buffs;
  }

  public removeAll() {
    this._buffs.forEach((b) => b.removeEffect(this.character));
  }
}