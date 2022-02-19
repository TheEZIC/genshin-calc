
import Effect from "@/Effects/Effect";
import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";

export default class EffectManager<T extends IWithOngoingEffects> {
  constructor(
    private effects: Effect<T>[],
  ) {
  }

  public get all() {
    return this.effects;
  }

  public addEffect(effect: Effect<T>) {
    this.effects.push(effect);
  }

  public removeEffect(effect: Effect<T>) {
    this.effects = this.effects.filter((e) => e.name !== effect.name);
  }
}
