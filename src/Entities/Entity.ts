import "reflect-metadata";
import Listener from "@/Helpers/Listener";
import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";
import Effect from "@/Effects/Effect";
import {Constructor} from "@/Helpers/Constructor";
import ElementalStatus from "@/ElementalStatuses/ElementalStatus";
import DamageCalculator from "@/Roster/DamageCalculator";
import {IAnySKillListenerArgs} from "@/Skills/SkillsListeners";

export default abstract class Entity<T extends IWithOngoingEffects = IWithOngoingEffects> implements IWithOngoingEffects {
  public abstract title: string;

  public ongoingEffects: Effect<Entity<T>>[] = [];
  public onAnyEffectStarted: Listener<IAnySKillListenerArgs<T>> = new Listener();
  public onAnyEffectEnded: Listener<IAnySKillListenerArgs<T>> = new Listener();

  public hasEffect(effect: Effect<any>): boolean {
    const index = this.ongoingEffects.indexOf(effect);
    return index !== -1;
  }

  public hasEffectByName(effect: Effect<any>): boolean {
    return Boolean(this.ongoingEffects.find(e => e.name === effect.name));
  }

  public hasEffectByInstance(effect: Constructor<Effect<any>>): boolean {
    return Boolean(this.ongoingEffects.find(e => e instanceof effect));
  }

  public getElementalStatus(status: Constructor<ElementalStatus>): ElementalStatus | undefined {
    return this.ongoingEffects.find(e => e instanceof status) as ElementalStatus | undefined;
  }

  public get elementalStatuses(): ElementalStatus[] {
    return this.ongoingEffects.filter(e => e instanceof ElementalStatus) as ElementalStatus[];
  }

  private _damageCalculator!: DamageCalculator;

  public get damageCalculator() {
    return this._damageCalculator;
  }

  public set damageCalculator(damageCalculator: DamageCalculator) {
    this._damageCalculator = damageCalculator;
  }
}
