import Character from "../Characters/Character";

export default abstract class Skill {
  public get name(): string {
    return this.constructor.name;
  }

  protected currentLvl = 10;

  public get lvl(): number {
    return this.currentLvl;
  }

  public changeLvl(lvl: number): this {
    this.currentLvl = lvl;
    return this;
  }

  public abstract calcDamage(character: Character): number;
}