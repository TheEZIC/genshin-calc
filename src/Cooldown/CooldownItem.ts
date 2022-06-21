import IBaseArgs from "@/IBaseArgs";
import CooldownBehavior from "@/Cooldown/CooldownBehavior";

export default class CooldownItem {
  private behavior: CooldownBehavior;

  constructor(
    private cooldownFrames: number = 0,
    private item?: Function,
  ) {
    this.behavior = new CooldownBehavior(cooldownFrames, item);
  }

  public changeCooldownFrames(frames: number) {
    this.cooldownFrames = frames;
  }

  public startCooldown(args: IBaseArgs, frames?: number) {
    frames = frames ?? this.cooldownFrames

    if (frames <= 0) {
      return;
    }

    this.behavior.frames = frames;
    this.behavior.start(args);
  }

  public endCooldown(args: IBaseArgs) {
    this.behavior.end(args);
  }

  public startDelayedCooldown(args: IBaseArgs, delay: number, frames?: number) {
    args.damageCalculator.addDelayedAction({
      delay,
      run: () => this.startCooldown(args, frames),
    });
  }

  public reduceCountdown(frames: number) {
    if (this.behavior.isStarted && this.isOnCooldown) {
      this.behavior.frames -= frames;
    }

    if (this.cooldownFrames < 0) {
      this.behavior.frames = 0;
    }
  }

  public increaseCountdown(frames: number) {
    if (this.behavior.isStarted && this.isOnCooldown) {
      this.behavior.frames += frames;
    }
  }

  public get framesAfterCooldown(): number {
    return this.behavior.currentFrame;
  }

  public get remainingCooldown(): number {
    return this.behavior.frames - this.framesAfterCooldown;
  }

  public get isOnCooldown() {
    return this.behavior.isStarted;
  }
}
