import {SkillType} from "@/Skills/SkillType";
import Character from "@/Entities/Characters/Character";
import Skill from "@/Skills/Skill";
import SkillArgs from "@/Skills/Args/SkillArgs";

export interface ISkillStrategy {
  type: SkillType;
  skillTypeName: string;
  runStartListener(args: SkillArgs): void;
  runEndListener(args: SkillArgs): void;
  modify(callback: (strategy: this) => void): this;
}

export default abstract class SkillStrategy implements ISkillStrategy {
  constructor(
    protected skill: Skill,
  ) {
  }

  public abstract type: SkillType;
  public abstract skillTypeName: string;

  public abstract runStartListener(args: SkillArgs): void;
  public abstract runEndListener(args: SkillArgs): void;

  public modify(callback: (strategy: this) => void): this {
    callback(this);
    return this;
  }
}
