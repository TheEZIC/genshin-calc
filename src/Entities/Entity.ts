import "reflect-metadata";
import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";
import Effect from "@/Effects/Effect";
import Listener from "@/Helpers/Listener";
import {IAnySKillListenerArgs} from "@/Skills/SkillsListeners";
import {Constructor} from "@/Helpers/Constructor";
import ElementalStatus from "@/ElementalStatuses/ElementalStatus";

export default abstract class Entity<T extends IWithOngoingEffects = IWithOngoingEffects> implements IWithOngoingEffects {
  public ongoingEffects: Effect<T>[] = [];
  public onAnyEffectStarted: Listener<IAnySKillListenerArgs<T>> = new Listener();
  public onAnyEffectEnded: Listener<IAnySKillListenerArgs<T>> = new Listener();

  public getElementalStatus(status: Constructor<ElementalStatus>): ElementalStatus | undefined {
    return this.ongoingEffects.find(e => e instanceof status) as ElementalStatus | undefined;
  }

  public get elementalStatuses(): ElementalStatus[] {
    return this.ongoingEffects.filter(e => e instanceof ElementalStatus) as ElementalStatus[];
  }
}
