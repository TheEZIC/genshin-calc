import {ISubscriber} from "@/Helpers/Listener";
import {ISkillListenerArgs} from "@/Skills/SkillsListeners";
import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";
import {IEndStrategy} from "@/Effects/IEndStrategy";
import {DurationEndStrategy} from "@/Effects/EndStrategy/DurationEndStrategy";

export default abstract class Effect<T extends IWithOngoingEffects> implements ISubscriber<ISkillListenerArgs<T>> {
  public name = this.constructor.name;

  public abstract framesDuration: number;
  public readonly countdownFrames: number = 0;

  protected abstract applyEffect(entity: T): void;
  protected abstract removeEffect(entity: T): void;

  protected endStrategy: IEndStrategy = new DurationEndStrategy(this);

  protected checkExistence(entity: T): Effect<T> | undefined {
    return entity.ongoingEffects.find(e => e.name === this.name);
  }

  protected isStarted = false;
  protected isOnCountdown: boolean = false;
  private framesAfterCountdown = 0;

  public get remainingCountdown(): number {
    return this.framesDuration - this.framesAfterCountdown;
  }

  public activate(entity: T): this {
    this.isStarted = true;
    this.endStrategy.onStart();
    entity.ongoingEffects.push(this);
    entity.onAnyEffectStarted.notifyAll({effect: this, entity});
    this.applyEffect(entity);
    return this;
  }

  public update(entity: T) {
    if (this.isOnCountdown) {
      this.framesAfterCountdown++;

      if (this.framesAfterCountdown >= this.countdownFrames) {
        this.isOnCountdown = false;
        this.framesAfterCountdown = 0;
      }
    }

    if (this.isStarted) {
      this.endStrategy.onUpdate();

      if (this.endStrategy.shouldEnd()) {
        this.deactivate(entity);
      }
    }
  }

  public deactivate(entity: T): this {
    //if nothing to remove
    if (!this.checkExistence(entity)) return this;
    const index = entity.ongoingEffects.map(e => e.name).indexOf(this.name);

    if (index > -1) {
      this.isStarted = false;
      this.endStrategy.onEnd();
      entity.ongoingEffects = entity.ongoingEffects.splice(index, 1);
      this.removeEffect(entity);
    }

    return this;
  }

  //startEvent
  public runOnEvent(args: ISkillListenerArgs<T>) {
    this.activate(args.entity);
  }
}
