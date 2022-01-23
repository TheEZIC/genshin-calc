import Effect from "./Effect";
import Character from "@/Characters/Character";
import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";

export default abstract class StackEffect<T extends IWithOngoingEffects> extends Effect<T> {
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

  public override activate(entity: T, startFrame: number): boolean {
    if (!super.activate(entity, startFrame)) return false;
    this.setStacks(this.stacks + 1);
    return true;
  }

  public override deactivate(entity: T): boolean {
    if (!super.deactivate(entity)) return false;
    this.setStacks(this.stacks - 1);
    return true;
  }
}
