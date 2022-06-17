import Skill from "@/Skills/Skill";
import Character from "@/Entities/Characters/Character";
import {isIBurstSKill} from "@/Skills/SkillTypes/IBurstSkill";
import {IBehavior} from "@/Behavior/IBehavior";
import {RefreshableClass} from "@/Refresher/RefreshableClass";
import {RefreshableProperty} from "@/Refresher/RefreshableProperty";
import SkillArgs from "@/Skills/Args/SkillArgs";

@RefreshableClass
export default class SkillBehavior implements IBehavior<Skill, SkillArgs>{
  constructor(
    private skill: Skill,
  ) {
  }

  @RefreshableProperty()
  private _isStarted: boolean = false;

  @RefreshableProperty()
  public currentFrame: number = 0;

  public get isStarted(): boolean {
    return this._isStarted;
  }

  private set isStarted(isStarted: boolean) {
    this._isStarted = isStarted;
  }

  public start(args: SkillArgs): Skill {
    if (this.isStarted || this.skill.countdown.isOnCountdown) return this.skill;

    const {character, hash, currentSkillIndex} = args;

    if (
      isIBurstSKill(this)
      && this.energyCost >= character.energy
    ) return this.skill;

    this.skill.strategy.runStartListener(args);
    args.damageCalculator.globalListeners.onSkillStarted.notifyAll(args);
    this.skill.onStart(args);

    this.isStarted = true;

    if (isIBurstSKill(this.skill)) {
      character.consumeEnergy(this.skill.energyConsumed);
    }

    return this.skill;
  }

  public update(args: SkillArgs): Skill {
    const {countdown} = this.skill;
    const {character, hash, currentSkillIndex} = args;

    if (countdown.isOnCountdown) {
      countdown.countdownFrames--;

      if (countdown.countdownFrames <= 0) {
        countdown.isOnCountdown = false;
        countdown.countdownFrames = 0;
      }
    }

    if (this.isStarted) {
      this.currentFrame++;

      if (this.currentFrame === this.skill.frames) {
        this.end(args);
      }
    }

    return this.skill;
  }

  public end(args: SkillArgs): Skill {
    if (!this.isStarted) return this.skill;

    const {character, hash, currentSkillIndex} = args;

    this.skill.strategy.runEndListener(args);
    args.damageCalculator.globalListeners.onSkillEnded.notifyAll(args);
    this.skill.onEnd(args);

    this.isStarted = false;
    this.currentFrame = 0;

    return this.skill;
  }
}
