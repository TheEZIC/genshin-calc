import Character from "@/Characters/Character";
import {StatValue} from "@/Characters/CalculatorStats/Types/StatValue";
import SkillStrategy from "@/Skills/SkillStrategy";
import EffectManager from "@/Effects/EffectsManagers/EffectManager";
import {SkillTargetType} from "@/Skills/SkillTargetType";

export interface ICalcDamageArgs {
  character: Character;
  prevSkill?: Skill;
  nextSkill?: Skill;
  prevSkills: Skill[];
  nextSkills: Skill[];
}

export default abstract class Skill {
  public abstract strategy: SkillStrategy;
  public abstract frames: number;

  public abstract skillTargetType: SkillTargetType;

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

  protected abstract calcDamage(args: ICalcDamageArgs): number;

  public getDamage(character: Character, startFrame: number, skills: Skill[], currentSkillIndex: number): number {
    this.strategy.runStartListener(character, startFrame);

    const prevSkill = skills[currentSkillIndex - 1] ?? null;
    const nextSkill = skills[currentSkillIndex + 1] ?? null;
    const prevSkills = skills.filter((s, i) => i < currentSkillIndex);
    const nextSkills = skills.filter((s, i) => i > currentSkillIndex);

    const dmgBonus = this.strategy.hasInfusion
      ? character.calculatorStats.getElementalDmgBonus(character.vision)
      : character.calculatorStats.getPhysicalDmgBonus();

    const statValue = new StatValue(dmgBonus);
    character.calculatorStats.ATK.affixes.add(statValue);

    const dmg = this.calcDamage({
      character,
      prevSkill,
      nextSkill,
      prevSkills,
      nextSkills,
    });

    character.calculatorStats.ATK.affixes.remove(statValue);

    return dmg;
  }
}
