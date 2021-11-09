import Character from "@/Characters/Character";

import { SkillType } from "./SkillType";

export default abstract class Skill {
  public abstract type: SkillType;
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

  public abstract calcDamage(character: Character): number;
}
