import {IEndStrategy} from "@/Effects/IEndStrategy";
import Effect from "@/Effects/Effect";
import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";

export class DurationEndStrategy<T extends IWithOngoingEffects> implements IEndStrategy {
  constructor(
    private effect: Effect<T>
  ) {
  }

  onEnd(): void {}
  onStart(): void {}
  onUpdate(): void {}

  shouldEnd(): boolean {
    const condition = this.effect.currentFrame >= this.effect.frames;
    return condition;
  }
}
