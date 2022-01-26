import {IAnySKillListenerArgs} from "@/Skills/SkillsListeners";
import Character from "@/Characters/Character";
import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";
import {ISubscriber} from "@/Helpers/Listener";
import Timeline from "@/Roster/Timeline/Timeline";

export default abstract class TimelineEffectsSubscriber<T extends IWithOngoingEffects> implements ISubscriber<IAnySKillListenerArgs<T>> {
  constructor(
    protected timeline: Timeline,
  ) {
  }

  public abstract runOnEvent(args: IAnySKillListenerArgs<T>): void;

  public subscribe(entity: T) {
    entity.onAnyEffectStarted.subscribe(this);
  }

  public unsubscribe(entity: T) {
    entity.onAnyEffectStarted.unsubscribe(this);
  }
}
