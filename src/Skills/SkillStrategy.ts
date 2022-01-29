import {SkillType} from "@/Skills/SkillType";
import Skill from "@/Skills/Skill";
import Character from "@/Characters/Character";

export default abstract class SkillStrategy<T> {
  constructor(
    protected skill: T,
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

  public changeInfusion(infusion: boolean) {
    this._hasInfusion = infusion;
  }

  public modify(callback: (strategy: this) => void): this {
    callback(this);
    return this;
  }
}
