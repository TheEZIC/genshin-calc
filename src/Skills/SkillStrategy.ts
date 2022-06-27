import {SkillType} from "@/Skills/SkillType";
import Character from "@/Entities/Characters/Character";
import Skill from "@/Skills/Skill";
import SkillArgs from "@/Skills/Args/SkillArgs";
import SkillListenerArgs from "@/Skills/Args/SkillListenerArgs";
import {IOnSkillAction, IOnSkillDamage} from "@/Roster/GlobalListeners";

export interface ISkillStrategy {
  type: SkillType;
  skillTypeName: string;
  runStartListener(args: SkillListenerArgs): void;
  runEndListener(args: SkillListenerArgs): void;
  runBeforeDamageListener(args: IOnSkillDamage): void;
  runDamageListener(args: IOnSkillDamage): void;
  runHealListener(args: IOnSkillAction): void;
  runCreateShieldListener(args: IOnSkillAction): void;
  modify(callback: (strategy: this) => void): this;
}

export default abstract class SkillStrategy implements ISkillStrategy {
  constructor(
    protected skill: Skill,
  ) {
  }

  public abstract type: SkillType;
  public abstract skillTypeName: string;

  public abstract runStartListener(args: SkillListenerArgs): void;
  public abstract runEndListener(args: SkillListenerArgs): void;

  public abstract runBeforeDamageListener(args: IOnSkillDamage): void;
  public abstract runDamageListener(args: IOnSkillDamage): void;
  public abstract runHealListener(args: IOnSkillAction): void;
  public abstract runCreateShieldListener(args: IOnSkillAction): void;

  public modify(callback: (strategy: this) => void): this {
    callback(this);
    return this;
  }
}
