import Character from "@/Characters/Character";
import { SkillType } from "./SkillType";
import {StatValue} from "@/Characters/CalculatorStats/Types/StatValue";

export default abstract class Skill {
  public abstract type: SkillType;
  public abstract frames: number;

  public get name(): string {
    return this.constructor.name;
  }

  protected _hasInfusion: boolean = true;

  public set hasInfusion(infusion: boolean) {
    this._hasInfusion = infusion;
  }

  public get hasInfusion() {
    return this._hasInfusion;
  }

  public changeInfusion(infusion: boolean) {
    this._hasInfusion = infusion;
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

  public changeLvl(lvl: number): this {
    this.currentLvl = lvl;
    return this;
  }

  protected abstract calcDamage(character: Character): number;

  public getDamage(character: Character): number {
    const dmgBonus = this.hasInfusion
      ? character.calculatorStats.getElementalDmgBonus(character.vision)
      : character.calculatorStats.getPhysicalDmgBonus();

    const statValue = new StatValue(dmgBonus);
    character.calculatorStats.ATK.addAffix(statValue);
    const dmg = this.calcDamage(character);
    character.calculatorStats.ATK.removeAffix(statValue);

    return dmg;
  }
}
