import Character from "@/Characters/Character";
import {ISubscriber} from "@/Helpers/Listener";
import {ISkillStartedListenerArgs} from "@/Skills/SkillsListeners";

export default abstract class Buff implements ISubscriber<ISkillStartedListenerArgs> {
  public name = this.constructor.name;

  public abstract framesDuration: number;

  public abstract applyEffect(character: Character): void;
  public abstract removeEffect(character: Character): void;

  protected activationFrames: number[] = [];

  public get isActive(): boolean {
    return Boolean(this.activationFrames.length);
  }

  protected checkRemove(character: Character, currentFrame: number): void {
    const framesToRemove = this.activationFrames.filter((f) => f + this.framesDuration < currentFrame);

    if (framesToRemove.length) {
      for (let frameToRemove of framesToRemove) {
        this.removeEffect(character);
      }

      this.activationFrames = this.activationFrames.filter((f) => !(f + this.framesDuration < currentFrame));
    }
  }

  public activate(character: Character, startFrame: number) {
    this.applyEffect(character);
    this.activationFrames.push(startFrame);
  }

  public update(character: Character, currentFrame: number) {
    this.checkRemove(character, currentFrame);
  }

  public runOnListener(args: ISkillStartedListenerArgs) {
    const {character, startTime} = args;
    this.activate(character, startTime);
  }
}