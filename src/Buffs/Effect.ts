import Character from "@/Characters/Character";
import {ISubscriber} from "@/Helpers/Listener";
import {ISkillListenerArgs} from "@/Skills/SkillsListeners";

export default abstract class Effect implements ISubscriber<ISkillListenerArgs> {
  public name = this.constructor.name;

  public abstract framesDuration: number;
  public readonly countdown: number = 0;

  protected abstract applyEffect(character: Character): void;
  protected abstract removeEffect(character: Character): void;

  protected activationFrames: number[] = [];

  public get isActive(): boolean {
    return Boolean(this.activationFrames.length);
  }

  protected checkRemove(character: Character, currentFrame: number): void {
    const framesToRemove = this.activationFrames.filter((f) => f + this.framesDuration < currentFrame);

    if (framesToRemove.length) {
      for (let frameToRemove of framesToRemove) {
        this.remove(character);

        character.ongoingEffects = character.ongoingEffects.filter((b) => b.name !== this.name);
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

  public activate(character: Character, startFrame: number): boolean {
    if (!this.shouldActivate(startFrame)) return false;
    this.applyEffect(character);
    this.activationFrames.push(startFrame);

    return true;
  }

  protected shouldRemove(): boolean {
    return true;
  }

  public remove(character: Character): boolean {
    if (!this.shouldRemove()) return false;
    this.removeEffect(character);

    return true;
  }

  public update(character: Character, currentFrame: number) {
    this.checkRemove(character, currentFrame);
  }

  public runOnListener(args: ISkillListenerArgs) {
    const {character, startTime} = args;
    character.ongoingEffects.push(this);
    this.activate(character, startTime);
  }
}
