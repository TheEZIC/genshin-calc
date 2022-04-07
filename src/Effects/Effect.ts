import {ISubscriber} from "@/Helpers/Listener";
import {ISkillListenerArgs} from "@/Skills/SkillsListeners";
import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";
import {IEndStrategy} from "@/Effects/IEndStrategy";
import {DurationEndStrategy} from "@/Effects/EndStrategy/DurationEndStrategy";
import GlobalListeners from "@/Roster/GlobalListeners";
import {container, ContainerBindings} from "@/inversify.config";
import {IPrototype} from "@/Helpers/IPrototype";
import {clone} from "lodash";

export default abstract class Effect<T extends IWithOngoingEffects> implements ISubscriber<ISkillListenerArgs<T>>, IPrototype<Effect<T>> {
  public name = this.constructor.name;

  public abstract framesDuration: number;
  public readonly countdownFrames: number = 0;

  protected abstract applyEffect(entity: T): void;
  protected abstract removeEffect(entity: T): void;

  protected endStrategy: IEndStrategy = new DurationEndStrategy(this);

  private globalListeners: GlobalListeners = container.get<GlobalListeners>(ContainerBindings.GlobalListeners);

  protected checkExistence(entity: T): Effect<T> | undefined {
    return entity.ongoingEffects.find(e => e.name === this.name);
  }

  protected isStarted = false;
  protected isOnCountdown: boolean = false;
  public currentFrame: number = 0;
  public framesAfterCountdown = 0;

  public get remainingCountdown(): number {
    return this.framesDuration - this.framesAfterCountdown;
  }

  public activate(entity: T, ignoreEvent: boolean = false): this {
    this.isStarted = true;
    this.endStrategy.onStart();
    entity.ongoingEffects.push(this);

    if (!ignoreEvent) {
      entity.onAnyEffectStarted.notifyAll({effect: this, entity});
      this.globalListeners.onEffectStarted.notifyAll({effect: this});
    }

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
      this.currentFrame++;
      this.endStrategy.onUpdate();

      if (this.endStrategy.shouldEnd()) {
        this.deactivate(entity);
      }
    }
  }

  public deactivate(entity: T,ignoreEvent: boolean = false): this {
    //if nothing to remove
    if (!this.checkExistence(entity)) return this;
    const index = entity.ongoingEffects.map(e => e.name).indexOf(this.name);

    if (index > -1) {
      this.isStarted = false;
      this.currentFrame = 0;
      this.endStrategy.onEnd();
      entity.ongoingEffects = entity.ongoingEffects.splice(index, 1);

      if (!ignoreEvent) {
        entity.onAnyEffectEnded.notifyAll({effect: this, entity});
        this.globalListeners.onEffectEnded.notifyAll({effect: this});
      }

      this.removeEffect(entity);
    }

    return this;
  }

  public reactivate(entity: T): this {
    const exist = this.checkExistence(entity);
    this.globalListeners.onEffectReactivate.notifyAll({effect: this});

    if (exist) {
      entity.ongoingEffects = entity.ongoingEffects.filter(e => e.name !== this.name);
      this.deactivate(entity, true);
    }

    return this.activate(entity, true);
  }

  //startEvent
  public runOnEvent(args: ISkillListenerArgs<T>) {
    this.activate(args.entity);
  }

  public get clone(): this {
    return clone(this);
  }
}
