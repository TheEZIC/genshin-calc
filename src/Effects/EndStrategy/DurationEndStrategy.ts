import {IEndStrategy} from "@/Effects/IEndStrategy";
import Effect from "@/Effects/Effect";
import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";

export class DurationEndStrategy<T extends IWithOngoingEffects> implements IEndStrategy {
  constructor(
    private effect: Effect<T>
  ) {
  }

  private currentFrame = 0;

  onEnd(): void {
    this.currentFrame = 0;
  }

  onStart(): void {
    this.currentFrame = 0;
  }

  onUpdate() {
    this.currentFrame++;
  }

  shouldEnd(): boolean {
    return this.currentFrame === this.effect.framesDuration;
  }
}
