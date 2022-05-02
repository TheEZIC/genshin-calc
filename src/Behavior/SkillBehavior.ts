import Skill from "@/Skills/Skill";
import Character from "@/Entities/Characters/Character";
import {isIBurstSKill} from "@/Skills/SkillTypes/IBurstSkill";
import {IBehavior} from "@/Behavior/IBehavior";
import GlobalListeners from "@/Roster/GlobalListeners";

export interface ISkillBehaviorArgs {
  character: Character;
  hash: string;
}

export default class SkillBehavior implements IBehavior<Skill, ISkillBehaviorArgs>{
  constructor(
    private skill: Skill,
  ) {
  }

  private globalListeners: GlobalListeners = GlobalListeners.instance;

  private _isStarted: boolean = false;
  public currentFrame: number = 0;

  public get isStarted(): boolean {
    return this._isStarted;
  }

  private set isStarted(isStarted: boolean) {
    this._isStarted = isStarted;
  }

  public start({character, hash}: ISkillBehaviorArgs): Skill {
    if (this.isStarted || this.skill.countdown.isOnCountdown) return this.skill;

    if (
      isIBurstSKill(this)
      && this.energyCost >= character.energy
    ) return this.skill;

    this.skill.strategy.runStartListener(character);
    this.globalListeners?.onSkillStarted.notifyAll({hash, skill: this.skill, character});
    this.skill.onStart({character, hash});

    this.isStarted = true;

    if (isIBurstSKill(this.skill)) {
      character.consumeEnergy(this.skill.energyConsumed);
    }

    return this.skill;
  }

  public update({character, hash}: ISkillBehaviorArgs): Skill {
    const {countdown} = this.skill;

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
        this.end({character, hash});
      }
    }

    return this.skill;
  }

  public end({character, hash}: ISkillBehaviorArgs): Skill {
    if (!this.isStarted) return this.skill;
    this.skill.strategy.runEndListener(character);
    this.globalListeners?.onSkillEnded.notifyAll({hash, skill: this.skill, character});
    this.skill.onEnd({character, hash});

    this.isStarted = false;
    this.currentFrame = 0;

    return this.skill;
  }
}
