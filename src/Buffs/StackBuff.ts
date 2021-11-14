import Buff from "./Buff";

export default abstract class StackBuff extends Buff {
  private _stacks: number = 0;

  get stacks() {
    return this._stacks;
  }

  set stacks(stacks: number) {
    if (stacks < 0) return;
    this._stacks = stacks;
  }
}