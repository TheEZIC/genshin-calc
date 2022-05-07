import "reflect-metadata";
import Listener from "@/Helpers/Listener";
import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";
import Effect from "@/Effects/Effect";
import {IAnySKillListenerArgs} from "@/Skills/SkillsListeners";
import {Constructor} from "@/Helpers/Constructor";
import ElementalStatus from "@/ElementalStatuses/ElementalStatus";
import {RefreshableClass} from "@/Refresher/RefreshableClass";
import {RefreshableProperty} from "@/Refresher/RefreshableProperty";

export default abstract class Entity<T extends IWithOngoingEffects = IWithOngoingEffects> implements IWithOngoingEffects {
  public abstract title: string;

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
