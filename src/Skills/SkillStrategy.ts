import {SkillType} from "@/Skills/SkillType";
import Character from "@/Entities/Characters/Character";
import Skill from "@/Skills/Skill";
import SkillArgs from "@/Skills/Args/SkillArgs";
import SkillListenerArgs from "@/Skills/Args/SkillListenerArgs";
import {IOnSkillAction, IOnSkillDamage, IOnSkillShield} from "@/Roster/GlobalListeners";
import {ICombatDamageArgs, ICombatHealArgs, ICombatShieldArgs} from "@/Skills/CombatActions";

export interface ISkillStrategy {
  type: SkillType;
  skillTypeName: string;
  runStartListener(args: SkillListenerArgs): void;
  runEndListener(args: SkillListenerArgs): void;
  runBeforeDamageListener(args: ICombatDamageArgs): void;
  runDamageListener(args: ICombatDamageArgs): void;
  runHealListener(args: ICombatHealArgs): void;
  runCreateShieldListener(args: ICombatShieldArgs): void;
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

  public abstract runBeforeDamageListener(args: ICombatDamageArgs): void;
  public abstract runDamageListener(args: ICombatDamageArgs): void;
  public abstract runHealListener(args: ICombatHealArgs): void;
  public abstract runCreateShieldListener(args: ICombatShieldArgs): void;

  public modify(callback: (strategy: this) => void): this {
    callback(this);
    return this;
  }
}
