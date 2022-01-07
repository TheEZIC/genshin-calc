import Character from "@/Characters/Character";
import {IWithEffects} from "@/Effects/IWithEffects";
import Effect from "@/Effects/Effect";
import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";

export default class EffectManager<T extends IWithOngoingEffects> {
  constructor(
    private buffed: IWithEffects<T>,
  ) {
  }

  public get effectsList() {
    return this.buffed.effects;
  }

  public addEffect(effect: Effect<T>) {
    this.buffed.effects.push(effect);
  }

  public removeEffect(effect: Effect<T>) {
    this.buffed.effects = this.buffed.effects.filter((e) => e.name !== effect.name);
  }

  public initEffects(character: T) {
    this.buffed.initEffects(character);
  }

  public abortEffects(character: T) {
    this.buffed.abortEffects(character);
  }
}
