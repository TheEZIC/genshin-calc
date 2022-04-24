import {SkillType} from "@/Skills/SkillType";
import Character from "@/Entities/Characters/Character";
import Skill from "@/Skills/Skill";

export interface ISkillStrategy {
  type: SkillType;
  runStartListener(character: Character): void;
  runEndListener(character: Character): void;
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

  public modify(callback: (strategy: this) => void): this {
    callback(this);
    return this;
  }
}
