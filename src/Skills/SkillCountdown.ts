import Skill from "@/Skills/Skill";
import DamageCalculator from "@/Roster/DamageCalculator";
import {RefreshableClass} from "@/Refresher/RefreshableClass";
import {RefreshableProperty} from "@/Refresher/RefreshableProperty";
import SkillArgs from "@/Skills/Args/SkillArgs";

@RefreshableClass
export default class SkillCountdown {
  constructor(
    private skill: Skill,
  ) {
  }

  @RefreshableProperty()
  private _isOnCountdown: boolean = false;

  @RefreshableProperty()
  public countdownFrames: number = 0;

  public reduceCountdown(frames: number) {
    if (this.skill.isStarted && this.isOnCountdown) {
      this.countdownFrames -= frames;
    }

    if (this.countdownFrames < 0) {
      this.countdownFrames = 0;
    }
  }

  public increaseCountdown(frames: number) {
    if (this.skill.isStarted && this.isOnCountdown) {
      this.countdownFrames += frames;
    }
  }

  public startCountdown(args: SkillArgs, frames?: number) {
    this._isOnCountdown = true;
    this.countdownFrames = frames ?? this.skill.countdownFrames;
  }

  public startDelayedCountdown(args: SkillArgs, delay: number, frames?: number) {
    args.damageCalculator.addDelayedAction({
      delay,
      run: () => this.startCountdown(args, frames),
    });
  }

  public get isOnCountdown(): boolean {
    return this._isOnCountdown;
  }

  public set isOnCountdown(onCountdown: boolean) {
    this._isOnCountdown = onCountdown;
  }
}
