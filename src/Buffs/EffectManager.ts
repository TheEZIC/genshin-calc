import Character from "@/Characters/Character";
import {IWithEffects} from "@/Buffs/IWithEffects";

export default class EffectManager {
  constructor(
    public buffed: IWithEffects,
  ) {
  }

  get effectsList() {
    return this.buffed.effects;
  }

  public initEffects(character: Character) {
    this.buffed.initEffects(character);
  }

  public abortEffects(character: Character) {
    this.buffed.abortEffects(character);
  }
}
