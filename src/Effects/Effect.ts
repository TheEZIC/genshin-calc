import {ISubscriber} from "@/Helpers/Listener";
import {ISkillListenerArgs} from "@/Skills/SkillsListeners";
import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";
import {IPrototype} from "@/Helpers/IPrototype";
import {RefreshableClass} from "@/Refresher/RefreshableClass";
import {RefreshableProperty} from "@/Refresher/RefreshableProperty";
import {Constructor} from "@/Helpers/Constructor";
import BehaviorUnit from "@/Behavior/BehaviorUnit";
import IBaseArgs from "@/IBaseArgs";
import CooldownItem from "@/Cooldown/CooldownItem";

export interface IEffectArgs extends IBaseArgs {
  entity: IWithOngoingEffects;
}

@RefreshableClass
export default abstract class Effect<T extends IWithOngoingEffects> extends BehaviorUnit<IEffectArgs> implements ISubscriber<ISkillListenerArgs<T>>, IPrototype<Effect<T>> {
  public name = this.constructor.name;

  @RefreshableProperty()
  public readonly countdownFrames: number = 0;

  private _cooldown: CooldownItem = new CooldownItem();

  public get cooldown() {
    this._cooldown.changeCooldownFrames(this.countdownFrames);
    return this._cooldown;
  }

  @RefreshableProperty()
  public readonly activeEntityOnly: boolean = false;

  protected abstract applyEffect(entity: T): void;
  protected abstract removeEffect(entity: T): void;

  protected checkExistence(entity: T): Effect<T> | undefined {
    return entity.ongoingEffects.find(e => e.name === this.name);
  }

  protected override shouldStart(args: IBaseArgs): boolean {
    return true;
  }

  protected override onStart(args: IEffectArgs) {
    super.onStart(args);
    this.cooldown.startCooldown(args);
  }

  public activate(entity: T, ignoreEvent: boolean = false): this {
    // if (this.cooldown.isOnCooldown) {
    //   return this;
    // }

    const {globalListeners} = entity.damageCalculator;

    this.start({
      entity,
      damageCalculator: entity.damageCalculator
    });

    entity.ongoingEffects.push(this);

    if (!ignoreEvent) {
      entity.onAnyEffectStarted.notifyAll({effect: this, entity});
      globalListeners.onEffectStarted.notifyAll({effect: this, entity});
    }

    this.cooldown.startCooldown({damageCalculator: entity.damageCalculator});
    this.applyEffect(entity);
    return this;
  }

  public deactivate(entity: T, ignoreEvent: boolean = false): this {
    //if nothing to remove
    if (!this.checkExistence(entity)) return this;

    this.end({
      entity,
      damageCalculator: entity.damageCalculator,
    });

    const {globalListeners} = entity.damageCalculator;
    const index = entity.ongoingEffects.map(e => e.name).indexOf(this.name);

    if (index > -1) {
      entity.ongoingEffects.splice(index, 1);

      if (!ignoreEvent) {
        entity.onAnyEffectEnded.notifyAll({effect: this, entity});
        globalListeners.onEffectEnded.notifyAll({effect: this, entity});
      }

      this.removeEffect(entity);
    }

    return this;
  }

  public reactivate(entity: T): this {
    const {globalListeners} = entity.damageCalculator;
    const exist = this.checkExistence(entity);
    globalListeners.onEffectReactivate.notifyAll({effect: this, entity});

    if (exist) {
      this.deactivate(entity, true);
      entity.ongoingEffects = entity.ongoingEffects.filter(e => e.name !== this.name);
    }

    return this.activate(entity, true);
  }

  protected override onEnd(args: IEffectArgs) {
    this.deactivate(args.entity as T);
  }

  //startEvent
  public runOnEvent(args: ISkillListenerArgs<T>) {
    this.activate(args.entity);
  }

  public get creator(): Constructor<Effect<any>> {
    return this.constructor as Constructor<Effect<any>>;
  }

  public get clone(): Effect<T> {
    return new this.creator();
  }
}
