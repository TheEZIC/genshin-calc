import Character from "@/Entities/Characters/Character";
import {StatValue} from "@/Entities/Characters/CalculatorStats/Types/StatValue";
import {ISkillStrategy} from "@/Skills/SkillStrategy";
import EffectManager from "@/Effects/EffectsManagers/EffectManager";
import {SkillTargetType} from "@/Skills/SkillTargetType";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import {isIBurstSKill} from "@/Skills/SkillTypes/IBurstSkill";
import DamageCalculator from "@/Roster/DamageCalculator";
import {isIDOTSkill} from "@/Skills/SkillInterfaces/IDOTSkill";
import ICD from "@/Skills/ICD";
import ElementalStatus from "@/ElementalStatuses/ElementalStatus";
import SkillLvl from "@/Skills/SkillLvl";

export interface ICalcDamageArgs {
  character: Character;
  prevSkill?: Skill;
  nextSkill?: Skill;
  prevSkills: Skill[];
  nextSkills: Skill[];
}

export interface IGetDamageArgs {
  character: Character;
  damageCalculator: DamageCalculator;
  skills: Skill[];
  currentSkillIndex: number;
  mvsCalcMode?: boolean;
}

export default abstract class Skill {
  public abstract strategy: ISkillStrategy;

  public abstract frames: number;
  public abstract countdownFrames: number;

  public get timelineDurationFrames(): number {
    return this.frames;
  }

  public abstract targetType: SkillTargetType;
  public abstract damageRegistrationType: SkillDamageRegistrationType;

  public ICD: ICD | null = null;
  public elementalStatus: ElementalStatus | null = null;
  public effectManager: EffectManager<Character> | null = null;

  public lvl: SkillLvl = new SkillLvl(this);

  protected readonly DEFAULT_ADD_ENERGY_FRAMES_DELAY: number = 100;

  public get name(): string {
    return this.constructor.name;
  }

  protected isMVsMode: boolean = false;

  protected onAwake(args: ICalcDamageArgs): void {
  }

  public awake(args: IGetDamageArgs): void {
    const calcArgs = this.convertGetDamageToCalcDamageArgs(args);
    this.onAwake(calcArgs);
  }

  protected abstract calcDamage(args: ICalcDamageArgs): number;

  public getDamage(args: IGetDamageArgs): number {
    if (!this.isStarted) return 0;
    this.isMVsMode = args.mvsCalcMode ?? false;

    const calcArgs = this.convertGetDamageToCalcDamageArgs(args);
    const {character} = calcArgs;

    const dmgBonus = this.strategy.hasInfusion
      ? character.calculatorStats.getElementalDmgBonus(character.vision)
      : character.calculatorStats.getPhysicalDmgBonus();

    const statValue = new StatValue(dmgBonus);
    character.calculatorStats.ATK.affixes.add(statValue);

    let dmg: number = 0;

    if (isIDOTSkill(this)) {
      if (this.damageFrames.includes(this.currentFrame)) {
        dmg = this.onHit(args);
      }
    } else {
      dmg = this.onHit(args);
    }

    character.calculatorStats.ATK.affixes.remove(statValue);

    return dmg;
  }

  private onHit(args: IGetDamageArgs) {
    const {elementalReactionManager, roster} = args.damageCalculator;
    const {entities} = roster;

    const calcArgs = this.convertGetDamageToCalcDamageArgs(args);

    let dmg = this.calcDamage(calcArgs);
    let totalDmg = 0;

    if (this.strategy.hasInfusion && !this.ICD?.onCountdown) {
      if (this.targetType === SkillTargetType.Single) {
        const enemy = entities[0];
        dmg += elementalReactionManager.applyReaction(calcArgs.character, enemy, this, dmg);
        totalDmg = dmg;
      } else {
        for (let enemy of entities) {
          let tempDmg = elementalReactionManager.applyReaction(calcArgs.character, enemy, this, dmg)
          totalDmg += tempDmg;
        }
      }
    } else {
      totalDmg = dmg;
    }

    this.ICD?.addHit();

    return totalDmg;
  }

  private _isStarted: boolean = false;
  protected currentFrame: number = 0;

  private _isOnCountdown: boolean = false;
  private framesAfterCountdown: number = 0;

  public get isStarted(): boolean {
    return this._isStarted;
  }

  public get isOnCountdown(): boolean {
    return this._isOnCountdown;
  }

  private set isOnCountdown(onCountdown: boolean) {
    this._isOnCountdown = onCountdown;
  }

  protected onStart(character: Character): void {
  }

  public start(character: Character): this {
    if (this.isStarted || this.isOnCountdown) return this;

    if (
      isIBurstSKill(this)
      && this.energyCost >= character.energy
    ) return this;

    this.strategy.runStartListener(character);
    character.skillManager.onAnySkillStarted.notifyAll(this);
    this.onStart(character);

    this._isStarted = true;
    this._isOnCountdown = true;

    if (isIBurstSKill(this)) {
      character.consumeEnergy(this.energyConsumed);
    }

    return this;
  }

  public update(character: Character) {
    if (this.isOnCountdown) {
      this.framesAfterCountdown++;

      if (this.framesAfterCountdown >= this.countdownFrames) {
        this.isOnCountdown = false;
        this.framesAfterCountdown = 0;
      }
    }

    if (this.isStarted) {
      this.currentFrame++;

      if (this.currentFrame === this.frames) {
        this.end(character);
      }
    }
  }

  protected onEnd(character: Character) {
  }

  public end(character: Character): this {
    if (!this._isStarted) return this;
    this.strategy.runEndListener(character);
    character.skillManager.onAnySkillEnded.notifyAll(this);
    this.onEnd(character);

    this._isStarted = false;
    this.isMVsMode = false;
    this.currentFrame = 0;

    return this;
  }

  private convertGetDamageToCalcDamageArgs(args: IGetDamageArgs) {
    const {skills, currentSkillIndex, character, damageCalculator, mvsCalcMode} = args;

    const prevSkill = skills[currentSkillIndex - 1] ?? null;
    const nextSkill = skills[currentSkillIndex + 1] ?? null;
    const prevSkills = skills.filter((s, i) => i < currentSkillIndex);
    const nextSkills = skills.filter((s, i) => i > currentSkillIndex);

    return {character, prevSkill, nextSkill, prevSkills, nextSkills, damageCalculator};
  }

  protected createRepeatedFrames(everyFrames: number, count: number, offset: number = 0): number[] {
    let temp: number[] = [];

    for (let i = 0; i < count; i++) {
      const frame = Math.ceil(everyFrames * i + offset);
      temp.push(frame);
    }

    return temp;
  }
}
