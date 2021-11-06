import Character from "@/Characters/Character";

import { SkillType } from "./SkillType";

export default abstract class Skill {
  public abstract type: SkillType;

  public get name(): string {
    return this.constructor.name;
  }

  protected currentLvl = 1;

  public get lvl(): number {
    return this.currentLvl;
  }

  public changeLvl(lvl: number): this {
    this.currentLvl = lvl;
    return this;
  }

  public abstract calcDamage(character: Character): number;
}
