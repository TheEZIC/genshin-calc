import Skill from "@/Skills/Skill";
import Character from "@/Entities/Characters/Character";
import {isIBurstSKill} from "@/Skills/SkillTypes/IBurstSkill";
import {IBehavior} from "@/Behavior/IBehavior";

export interface ISkillBehaviorArgs {
  character: Character
}

export default class SkillBehavior implements IBehavior<Skill, ISkillBehaviorArgs>{
  constructor(
    private skill: Skill,
  ) {
  }

  private _isStarted: boolean = false;
  public currentFrame: number = 0;

  private _isOnCountdown: boolean = false;
  private framesAfterCountdown: number = 0;

  public get isStarted(): boolean {
    return this._isStarted;
  }

  private set isStarted(isStarted: boolean) {
    this._isStarted = isStarted;
  }

  public get isOnCountdown(): boolean {
    return this._isOnCountdown;
  }

  private set isOnCountdown(onCountdown: boolean) {
    this._isOnCountdown = onCountdown;
  }

  public start({character}: ISkillBehaviorArgs): Skill {
    if (this.isStarted || this.isOnCountdown) return this.skill;

    if (
      isIBurstSKill(this)
      && this.energyCost >= character.energy
    ) return this.skill;

    this.skill.strategy.runStartListener(character);
    character.skillManager.onAnySkillStarted.notifyAll(this.skill);
    this.skill.onStart({character});

    this.isStarted = true;
    this.isOnCountdown = true;

    if (isIBurstSKill(this.skill)) {
      character.consumeEnergy(this.skill.energyConsumed);
    }

    return this.skill;
  }

  public update({character}: ISkillBehaviorArgs): Skill {
    if (this.isOnCountdown) {
      this.framesAfterCountdown++;

      if (this.framesAfterCountdown >= this.skill.countdownFrames) {
        this.isOnCountdown = false;
        this.framesAfterCountdown = 0;
      }
    }

    if (this.isStarted) {
      this.currentFrame++;

      if (this.currentFrame === this.skill.frames) {
        this.end({character});
      }
    }

    return this.skill;
  }

  public end({character}: ISkillBehaviorArgs): Skill {
    if (!this.isStarted) return this.skill;
    this.skill.strategy.runEndListener(character);
    character.skillManager.onAnySkillEnded.notifyAll(this.skill);
    this.skill.onEnd({character});

    this.isStarted = false;
    this.skill.isMVsMode = false;
    this.currentFrame = 0;

    return this.skill;
  }
}
