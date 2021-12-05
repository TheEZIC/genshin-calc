import Character from "@/Characters/Character";
import {StatValue} from "@/Characters/CalculatorStats/Types/StatValue";
import SkillStrategy from "@/Skills/SkillStrategy";
import SkillsManager from "@/Skills/SkillsManager";
import Buff from "@/Buffs/Buff";
import {IWithBuffs} from "@/Buffs/IWithBuffs";

export default abstract class Skill implements IWithBuffs {
  public abstract strategy: SkillStrategy;
  public abstract frames: number;

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

  public changeLvl(lvl: number): this {
    this.currentLvl = lvl;
    return this;
  }

  protected abstract _buffs: Buff[];

  public get buffs() {
    return this._buffs;
  }

  public abstract initBuffs(character: Character): void;
  public abstract abortBuffs(character: Character): void;

  protected abstract calcDamage(character: Character): number;

  public getDamage(character: Character, startFrame: number): number {
    this.strategy.runStartListener(character, startFrame);

    const dmgBonus = this.strategy.hasInfusion
      ? character.calculatorStats.getElementalDmgBonus(character.vision)
      : character.calculatorStats.getPhysicalDmgBonus();

    const statValue = new StatValue(dmgBonus);
    character.calculatorStats.ATK.addAffix(statValue);
    const dmg = this.calcDamage(character);
    character.calculatorStats.ATK.removeAffix(statValue);

    return dmg;
  }
}
