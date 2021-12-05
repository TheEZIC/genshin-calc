import Character from "@/Characters/Character";
import {ISubscriber} from "@/Helpers/Listener";
import {ISkillListenerArgs} from "@/Skills/SkillsListeners";

export default abstract class Buff implements ISubscriber<ISkillListenerArgs> {
  public name = this.constructor.name;

  public abstract framesDuration: number;

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

        character.ongoingBuffs = character.ongoingBuffs.filter((b) => b.name !== this.name);
      }

      this.activationFrames = this.activationFrames.filter((f) => !(f + this.framesDuration < currentFrame));
    }
  }

  public activate(character: Character, startFrame: number) {
    if (this.isActive) return;
    this.applyEffect(character);
    this.activationFrames.push(startFrame);
  }

  public remove(character: Character) {
    this.removeEffect(character);
  }

  public update(character: Character, currentFrame: number) {
    this.checkRemove(character, currentFrame);
  }

  public runOnListener(args: ISkillListenerArgs) {
    const {character, startTime} = args;
    character.ongoingBuffs.push(this);
    this.activate(character, startTime);
  }
}
