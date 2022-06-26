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

export interface IOnAnyEffect<T extends IWithOngoingEffects = any> {
  entity: T;
  effect: Effect<T>;
}
export default class GlobalListeners {
  constructor(
    public damageCalculator: DamageCalculator,
  ) {
  }

  public onDamage: Listener<IOnSkillDamage> = new Listener<IOnSkillDamage>();
  public onHeal: Listener<IOnSkillAction> = new Listener<IOnSkillAction>();
  public onCreateShield: Listener<IOnSkillAction> = new Listener<IOnSkillAction>();

  public onSkillStarted: Listener<SkillListenerArgs> = new Listener<SkillListenerArgs>();
  public onSkillEnded: Listener<SkillListenerArgs> = new Listener<SkillListenerArgs>();

  public onEffectStarted: Listener<IOnAnyEffect> = new Listener<IOnAnyEffect>();
  public onEffectReactivate: Listener<IOnAnyEffect> = new Listener<IOnAnyEffect>();
  public onEffectRefill: Listener<IOnAnyEffect> = new Listener<IOnAnyEffect>();
  public onEffectEnded: Listener<IOnAnyEffect> = new Listener<IOnAnyEffect>();
}
