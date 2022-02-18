import Character from "@/Characters/Character";
import {StatValue} from "@/Characters/CalculatorStats/Types/StatValue";
import {ISkillStrategy} from "@/Skills/SkillStrategy";
import EffectManager from "@/Effects/EffectsManagers/EffectManager";
import {SkillTargetType} from "@/Skills/SkillTargetType";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import {isIBurstSKill} from "@/Skills/SkillTypes/IBurstSkill";
import DamageCalculator from "@/Roster/DamageCalculator";
import {isIDOTSkill} from "@/Skills/SkillInterfaces/IDOTSkill";
import ICD from "@/Skills/ICD";
import ElementalStatus from "@/ElementalStatuses/ElementalStatus";
import Enemy from "@/Enemies/Enemy";

export interface ICalcDamageArgs {
  character: Character;
  damageCalculator: DamageCalculator;
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

  public abstract targetType: SkillTargetType;
  public abstract damageRegistrationType: SkillDamageRegistrationType;

  public ICD: ICD | null = null;
  public elementalStatus: ElementalStatus | null = null;

  protected abstract calcDamage(args: ICalcDamageArgs): number;

  public effectManager: EffectManager<Character> | null = null;

  protected readonly DEFAULT_ADD_ENERGY_FRAMES_DELAY: number = 100;

  public get name(): string {
    return this.constructor.name;
  }

  protected currentLvl = 1;
  private additionalLvls: number[] = [];

  public addAdditionalLvl(additionalLvl: number) {
    this.additionalLvls.push(additionalLvl);
  }

  public removeAdditionalLvl(additionalLvl: number) {
    this.additionalLvls.filter((l) => l !== additionalLvl);
  }

  private get sumOfAdditionalLvls() {
    return this.additionalLvls.reduce((a, b) => a + b, 0);
  }

  public get lvl(): number {
    return this.currentLvl + this.sumOfAdditionalLvls;
  }

  public get timelineDurationFrames(): number {
    return this.frames;
  }

  public changeLvl(lvl: number): this {
    this.currentLvl = lvl;
    return this;
  }

  protected isMVsMode: boolean = false;

  private convertGetDamageToCalcDamageArgs(args: IGetDamageArgs) {
    const {skills, currentSkillIndex, character, damageCalculator, mvsCalcMode} = args;

    const prevSkill = skills[currentSkillIndex - 1] ?? null;
    const nextSkill = skills[currentSkillIndex + 1] ?? null;
    const prevSkills = skills.filter((s, i) => i < currentSkillIndex);
    const nextSkills = skills.filter((s, i) => i > currentSkillIndex);

    return {character, prevSkill, nextSkill, prevSkills, nextSkills, damageCalculator};
  }

  protected onAwake(args: ICalcDamageArgs): void {
  }

  public awake(args: IGetDamageArgs): void {
    const calcArgs = this.convertGetDamageToCalcDamageArgs(args);
    this.onAwake(calcArgs);
  }

  private onHit(calcArgs: ICalcDamageArgs) {
    const {elementalReactionManager, roster} = calcArgs.damageCalculator;
    const {enemies} = roster;

    let dmg = this.calcDamage(calcArgs);
    let totalDmg = 0;

    if (this.elementalStatus && !this.ICD?.onCountdown) {
      const workWithReactions = (enemy: Enemy, tempDmg: number) => {
        if (!this.elementalStatus) return tempDmg;
        const hasStatus = enemy.ongoingEffects.find(e => e instanceof ElementalStatus);

        if (!hasStatus) {
          enemy.effectManager.addEffect(this.elementalStatus);
        } else {
          tempDmg += elementalReactionManager.applyReactionBonusDamage(calcArgs.character, enemy, dmg, this.elementalStatus)
        }

        return tempDmg;
      }

      if (this.targetType === SkillTargetType.Single) {
        const enemy = enemies[0];
        totalDmg = workWithReactions(enemy, dmg);
      } else {
        for (let enemy of enemies) {
          totalDmg += workWithReactions(enemy, dmg);
        }
      }
    } else {
      totalDmg = dmg;
    }

    this.ICD?.addHit();

    return totalDmg;
  }

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
        dmg = this.onHit(calcArgs);
      }
    } else {
      dmg = this.onHit(calcArgs);
    }

    character.calculatorStats.ATK.affixes.remove(statValue);

    return dmg;
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

  protected onStart(character: Character, damageCalculator: DamageCalculator): void {
  }

  public start(character: Character, damageCalculator: DamageCalculator): this {
    if (this.isStarted || this.isOnCountdown) return this;

    if (
      isIBurstSKill(this)
      && this.energyCost >= character.energy
    ) return this;

    this.strategy.runStartListener(character);
    character.skillManager.onAnySkillStarted.notifyAll(this);
    this.onStart(character, damageCalculator);

    this._isStarted = true;
    this._isOnCountdown = true;

    if (isIBurstSKill(this)) {
      character.consumeEnergy(this.energyConsumed);
    }

    return this;
  }

  public update(character: Character, damageCalculator: DamageCalculator) {
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
        this.end(character, damageCalculator);
      }
    }
  }

  protected onEnd(character: Character, damageCalculator: DamageCalculator) {
  }

  public end(character: Character, damageCalculator: DamageCalculator): this {
    if (!this._isStarted) return this;
    this.strategy.runEndListener(character);
    character.skillManager.onAnySkillEnded.notifyAll(this);
    this.onEnd(character, damageCalculator);

    this._isStarted = false;
    this.isMVsMode = false;
    this.currentFrame = 0;

    return this;
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
