import {ISubscriber} from "@/Helpers/Listener";
import {ISkillListenerArgs} from "@/Skills/SkillsListeners";
import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";

export default abstract class Effect<T extends IWithOngoingEffects> implements ISubscriber<ISkillListenerArgs<T>> {
  public name = this.constructor.name;

  public abstract framesDuration: number;
  public readonly countdown: number = 0;

  protected abstract applyEffect(entity: T): void;
  protected abstract removeEffect(entity: T): void;

  public activate(entity: T): boolean {
    entity.onAnyEffectStarted.notifyAll({effect: this, entity});
    this.applyEffect(entity);

    return true;
  }

  public deactivate(entity: T): boolean {
    this.removeEffect(entity);

    return true;
  }

  public runOnEvent(args: ISkillListenerArgs<T>) {
    args.entity.ongoingEffects.push(this);
    this.activate(args.entity);
  }
}
