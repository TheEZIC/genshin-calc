import Effect from "./Effect";
import Character from "@/Characters/Character";

export default abstract class StackEffect extends Effect {
  private _stacks: number = 0;
  protected abstract maxStacks: number;

  public get stacks() {
    return this._stacks;
  }

  private shouldAddStack(stacks: number) {
    return !(stacks < 0 || stacks > this.maxStacks);
  }

  private setStacks(stacks: number): void {
    this._stacks = stacks;
  }

  protected override shouldActivate(startFrame: number): boolean {
    return !this.shouldAddStack(this.stacks + 1) && !this.isOnCountdown(startFrame);
  }

  protected override shouldRemove(): boolean {
    return this.shouldAddStack(this.stacks - 1);
  }

  public override activate(character: Character, startFrame: number): boolean {
    if (!super.activate(character, startFrame)) return false;
    this.setStacks(this.stacks + 1);
    return true;
  }

  public override remove(character: Character): boolean {
    if (!super.remove(character)) return false;
    this.setStacks(this.stacks - 1);
    return true;
  }
}
