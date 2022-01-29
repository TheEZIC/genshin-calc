import {SkillType} from "@/Skills/SkillType";
import Character from "@/Characters/Character";
import Skill from "@/Skills/Skill";

export interface ISkillStrategy {
  type: SkillType;
  hasInfusion: boolean;
  runStartListener(character: Character): void;
  runEndListener(character: Character): void;
  changeInfusion(infusion: boolean): void;
  modify(callback: (strategy: this) => void): this;
}

export default abstract class SkillStrategy implements ISkillStrategy {
  constructor(
    protected skill: Skill,
  ) {
  }

  public abstract type: SkillType;

  public abstract runStartListener(character: Character): void;
  public abstract runEndListener(character: Character): void;

  protected _hasInfusion: boolean = true;

  public set hasInfusion(infusion: boolean) {
    this._hasInfusion = infusion;
  }

  public get hasInfusion() {
    return this._hasInfusion;
  }

  public changeInfusion(infusion: boolean): void {
    this._hasInfusion = infusion;
  }

  public modify(callback: (strategy: this) => void): this {
    callback(this);
    return this;
  }
}
