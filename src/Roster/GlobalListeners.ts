import Listener from "@/Helpers/Listener";
import Character from "@/Entities/Characters/Character";
import Skill from "@/Skills/Skill";
import Effect from "@/Effects/Effect";
import ElementalStatus from "@/ElementalStatuses/ElementalStatus";
import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";
import SingletonsManager from "@/Singletons/SingletonsManager";
import SkillArgs from "@/Skills/Args/SkillArgs";
import DamageCalculator from "@/Roster/DamageCalculator";
import Entity from "@/Entities/Entity";
import SkillListenerArgs from "@/Skills/Args/SkillListenerArgs";
import Enemy from "@/Entities/Enemies/Enemy";
import ShieldEffect from "@/Effects/ShieldEffect";
import {ICombatDamageArgs, ICombatHealArgs, ICombatShieldArgs} from "@/Skills/CombatActions";

export interface IOnSkillAction {
  character: Character;
  targets: Enemy[];
  comment: string;
  skill: Skill;
  value: number;
}

export interface IOnSkillDamage extends IOnSkillAction {
  elementalStatus?: ElementalStatus;
}

export interface IOnSkillShield extends IOnSkillAction {
  shield: ShieldEffect<Entity>;
}

export interface IOnAnyEffect<T extends IWithOngoingEffects = any> {
  entity: T;
  effect: Effect<T>;
}
export default class GlobalListeners {
  constructor(
    public damageCalculator: DamageCalculator,
  ) {
  }

  public onDamage: Listener<ICombatDamageArgs> = new Listener();
  public onHeal: Listener<ICombatHealArgs> = new Listener();
  public onCreateShield: Listener<ICombatShieldArgs> = new Listener();

  public onSkillStarted: Listener<SkillListenerArgs> = new Listener();
  public onSkillEnded: Listener<SkillListenerArgs> = new Listener();

  public onEffectStarted: Listener<IOnAnyEffect> = new Listener();
  public onEffectReactivate: Listener<IOnAnyEffect> = new Listener();
  public onEffectRefill: Listener<IOnAnyEffect> = new Listener();
  public onEffectEnded: Listener<IOnAnyEffect> = new Listener();
}
