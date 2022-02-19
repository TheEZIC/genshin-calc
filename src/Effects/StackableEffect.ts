import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";
import Effect from "@/Effects/Effect";

export default abstract class StackableEffect<T extends IWithOngoingEffects> extends Effect<T> {
  private _currentStacks: Effect<T>[] = [];
  public framesDuration = 0;

  protected abstract readonly maxStacks: number;

  public override activate(entity: T): this {
    this.applyEffect(entity);
    return this;
  }

  public override update(entity: T) {
    this._currentStacks.forEach(s => s.update(entity));
  }

  protected override removeEffect(entity: T) {
    //Do nothing
  }

  public override deactivate(entity: T): this {
    return this;
  }

  public addStack(entity: T, effect: Effect<T>): void {
    if (this._currentStacks.length < this.maxStacks) {
      this._currentStacks.push(effect);
    } else {
      const sorted = this._currentStacks.sort(
        (a, b) => a.remainingCountdown - b.remainingCountdown
      );

      this._currentStacks = sorted.splice(1);
      this._currentStacks.push(effect);
    }
  }

  public removeStack(entity: T, effect: Effect<T>): void {
    if (this._currentStacks.length === 0) return;

    const index = this._currentStacks.map(e => e.name).indexOf(effect.name);
    if (index > -1) {
      this._currentStacks = this._currentStacks.splice(index, 1);
    }
  }
}
