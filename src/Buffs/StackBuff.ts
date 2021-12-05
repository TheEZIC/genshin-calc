import Buff from "./Buff";
import Character from "@/Characters/Character";

export default abstract class StackBuff extends Buff {
  private _stacks: number = 0;
  protected abstract maxStacks: number;

  public get stacks() {
    return this._stacks;
  }

  private setStacks(stacks: number): boolean {
    if (stacks < 0 || stacks > this.maxStacks) return false;
    this._stacks = stacks;
    return true;
  }

  public override activate(character: Character, startFrame: number) {
    const stacksChanged = this.setStacks(this.stacks + 1);
    if (!stacksChanged) return;
    this.applyEffect(character);
    this.activationFrames.push(startFrame);
  }

  public override remove(character: Character) {
    const stacksChanged = this.setStacks(this.stacks - 1);
    if (!stacksChanged) return;
    super.remove(character);
  }
}
