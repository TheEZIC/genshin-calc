import {ISubscriber} from "@/Helpers/Listener";
import {ISkillListenerArgs} from "@/Skills/SkillsListeners";
import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";
import Character from "@/Characters/Character";

export default abstract class Effect<T extends IWithOngoingEffects> implements ISubscriber<ISkillListenerArgs<T>> {
  public name = this.constructor.name;

  public abstract framesDuration: number;
  public readonly countdown: number = 0;

  protected abstract applyEffect(entity: T): void;
  protected abstract removeEffect(entity: T): void;

  protected activationFrames: number[] = [];

  public get isActive(): boolean {
    return Boolean(this.activationFrames.length);
  }

  protected checkRemove(entity: T, currentFrame: number): void {
    const framesToRemove = this.activationFrames.filter((f) => f + this.framesDuration < currentFrame);

    if (framesToRemove.length) {
      for (let frameToRemove of framesToRemove) {
        this.remove(entity);

        entity.ongoingEffects = entity.ongoingEffects.filter((b) => b.name !== this.name);
      }

      this.activationFrames = this.activationFrames.filter((f) => !(f + this.framesDuration < currentFrame));
    }
  }

  protected isOnCountdown(startFrame: number): boolean {
    return this.activationFrames[this.activationFrames.length - 1] + this.framesDuration > startFrame;
  }

  protected shouldActivate(startFrame: number): boolean {
    return !this.isActive && !this.isOnCountdown(startFrame);
  }

  public activate(entity: T, startFrame: number): boolean {
    if (!this.shouldActivate(startFrame)) return false;
    this.applyEffect(entity);
    this.activationFrames.push(startFrame);

    return true;
  }

  protected shouldRemove(): boolean {
    return true;
  }

  public remove(entity: T): boolean {
    if (!this.shouldRemove()) return false;
    this.removeEffect(entity);

    return true;
  }

  public update(entity: T, currentFrame: number) {
    this.checkRemove(entity, currentFrame);
  }

  public runOnListener(args: ISkillListenerArgs<T>) {
    const {entity, startTime} = args;
    entity.ongoingEffects.push(this);
    this.activate(entity, startTime);
  }
}
