import {SkillType} from "@/Skills/SkillType";
import Skill from "@/Skills/Skill";
import Character from "@/Characters/Character";

export default abstract class SkillStrategy {
  constructor(
    protected skill: Skill,
  ) {
  }
  
  public abstract type: SkillType;

  public abstract runStartListener(character: Character, startTime: number): void;
  public abstract runEndListener(character: Character, startTime: number): void;

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

  public modify(callback: (strategy: this) => void): this {
    callback(this);
    return this;
  }
}
