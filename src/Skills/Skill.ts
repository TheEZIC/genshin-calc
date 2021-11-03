import SkillValue from "./SkillValue";
import Character from "../Characters/Character";

export interface ISkill {
  frames: number;
  readonly MVs: number;
  readonly currentValue: number;
  calcDamage: (character: Character) => number;
}

export interface ICanceledSkill {
  canceledFrames: number;
  canCanceled: boolean;
  readonly canceledMVs: number;
  readonly currentValue: number;
  calcDamage: (character: Character) => number;
}

export default abstract class Skill implements ISkill, ICanceledSkill {
  public abstract frames: number;
  protected abstract value: SkillValue;

  public get name(): string {
    return this.constructor.name;
  }

  public get MVs (): number {
    return this.currentValue / (this.frames / 60) / 100;
  }

  public canceledFrames: number = 0;
  public canCanceled: boolean = false;

  public get canceledMVs(): number {
    return this.currentValue / (this.canceledFrames / 60) / 100;
  }

  protected currentLvl = 10;

  public changeLvl(lvl: number): this {
    this.currentLvl = lvl;
    return this;
  }

  public get currentValue() {
    return this.value.getValueAtLvl(this.currentLvl);
  }

  public abstract calcDamage(character: Character): number;
}