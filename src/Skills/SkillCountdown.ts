import Skill from "@/Skills/Skill";
import DamageCalculator from "@/Roster/DamageCalculator";

export default class SkillCountdown {
  constructor(
    private skill: Skill,
  ) {
  }

  private damageCalculator: DamageCalculator = DamageCalculator.instance;

  private _isOnCountdown: boolean = false;
  public countdownFrames: number = 0;


  public reduceCountdown(frames: number) {
    this.countdownFrames -= frames;
  }

  public increaseCountdown(frames: number) {
    this.countdownFrames += frames;
  }

  public startCountdown(frames?: number) {
    this._isOnCountdown = true;
    this.countdownFrames = frames ?? this.skill.countdownFrames;
  }

  public startDelayedCountdown(delay: number, frames?: number) {
    this.damageCalculator.addAction({
      delay,
      run: () => this.startCountdown(frames),
    });
  }

  public get isOnCountdown(): boolean {
    return this._isOnCountdown;
  }

  public set isOnCountdown(onCountdown: boolean) {
    this._isOnCountdown = onCountdown;
  }
}
