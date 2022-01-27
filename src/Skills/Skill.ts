import Character from "@/Characters/Character";
import {StatValue} from "@/Characters/CalculatorStats/Types/StatValue";
import SkillStrategy from "@/Skills/SkillStrategy";
import EffectManager from "@/Effects/EffectsManagers/EffectManager";
import {SkillTargetType} from "@/Skills/SkillTargetType";
import lodash from "lodash";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";

export interface ICalcDamageArgs {
  character: Character;
  prevSkill?: Skill;
  nextSkill?: Skill;
  prevSkills: Skill[];
  nextSkills: Skill[];
}

export interface IGetDamageArgs {
  character: Character;
  skills: Skill[];
  currentSkillIndex: number;
  mvsCalcMode?: boolean;
}

export default abstract class Skill {
  public abstract strategy: SkillStrategy;
  public abstract frames: number;

  public abstract targetType: SkillTargetType;
  public abstract damageRegistrationType: SkillDamageRegistrationType;

  protected abstract calcDamage(args: ICalcDamageArgs): number;

  public effectManager: EffectManager<Character> | null = null;

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
    const {skills, currentSkillIndex, character, mvsCalcMode} = args;

    const prevSkill = skills[currentSkillIndex - 1] ?? null;
    const nextSkill = skills[currentSkillIndex + 1] ?? null;
    const prevSkills = skills.filter((s, i) => i < currentSkillIndex);
    const nextSkills = skills.filter((s, i) => i > currentSkillIndex);

    return {character, prevSkill, nextSkill, prevSkills, nextSkills};
  }

  protected awakeLogic(args: ICalcDamageArgs): void {
  }

  public awake(args: IGetDamageArgs): void {
    const calcArgs = this.convertGetDamageToCalcDamageArgs(args);
    this.awakeLogic(calcArgs);
  }

  public getDamage(args: IGetDamageArgs): number {
    this.isMVsMode = args.mvsCalcMode ?? false;

    const calcArgs = this.convertGetDamageToCalcDamageArgs(args);
    const {character} = calcArgs;

    const dmgBonus = this.strategy.hasInfusion
      ? character.calculatorStats.getElementalDmgBonus(character.vision)
      : character.calculatorStats.getPhysicalDmgBonus();

    const statValue = new StatValue(dmgBonus);
    character.calculatorStats.ATK.affixes.add(statValue);
    const dmg = this.calcDamage(calcArgs);

    character.calculatorStats.ATK.affixes.remove(statValue);

    return dmg;
  }

  private isStarted = false;
  private currentFrame = 0;

  public start(character: Character): this {
    if (this.isStarted) return this;
    this.strategy.runStartListener(character);
    character.skillManager.onAnySkillStarted.notifyAll(this);
    this.isStarted = true;
    return this;
  }

  public update(character: Character) {
    if (!this.isStarted) return;
    this.currentFrame++;

    if (this.currentFrame === this.frames) {
      this.end(character);
    }
  }

  public end(character: Character): this {
    if (!this.isStarted) return this;
    this.strategy.runEndListener(character);
    character.skillManager.onAnySkillEnded.notifyAll(this);
    this.isStarted = false;
    this.isMVsMode = false;
    this.currentFrame = 0;
    return this;
  }

  public get clone(): this {
    return lodash.clone(this);
  }
}
