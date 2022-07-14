import Listener from "@/Helpers/Listener";
import Effect from "@/Effects/Effect";
import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";
import SkillListenerArgs from "@/Skills/Args/SkillListenerArgs";
import {ICombatDamageArgs, ICombatHealArgs, ICombatShieldArgs} from "@/Skills/CombatActions";

export interface ISkillListenerArgs<T> {
  entity: T;
}

export interface IAnySKillListenerArgs<T extends IWithOngoingEffects> {
  entity: T;
  effect: Effect<T>;
}

export default class SkillsListeners {
  public NormalAttackStarted: Listener<SkillListenerArgs> = new Listener();
  public NormalAttackEnded: Listener<SkillListenerArgs> = new Listener();
  public NormalAttackBeforeDamage: Listener<ICombatDamageArgs> = new Listener();
  public NormalAttackDamage: Listener<ICombatDamageArgs> = new Listener();
  public NormalAttackHeal: Listener<ICombatHealArgs> = new Listener();
  public NormalAttackCreateShield: Listener<ICombatShieldArgs> = new Listener();

  public HoldAttackStarted: Listener<SkillListenerArgs> = new Listener();
  public HoldAttackEnded: Listener<SkillListenerArgs> = new Listener();
  public HoldAttackBeforeDamage: Listener<ICombatDamageArgs> = new Listener();
  public HoldAttackDamage: Listener<ICombatDamageArgs> = new Listener();
  public HoldAttackHeal: Listener<ICombatHealArgs> = new Listener();
  public HoldAttackCreateShield: Listener<ICombatShieldArgs> = new Listener();

  public PlungeAttackStarted: Listener<SkillListenerArgs> = new Listener();
  public PlungeAttackEnded: Listener<SkillListenerArgs> = new Listener();
  public PlungeAttackBeforeDamage: Listener<ICombatDamageArgs> = new Listener();
  public PlungeAttackDamage: Listener<ICombatDamageArgs> = new Listener();
  public PlungeAttackHeal: Listener<ICombatHealArgs> = new Listener();
  public PlungeAttackCreateShield: Listener<ICombatShieldArgs> = new Listener();

  public DashSkillStarted: Listener<SkillListenerArgs> = new Listener();
  public DashSkillEnded: Listener<SkillListenerArgs> = new Listener();
  public DashSkillBeforeDamage: Listener<ICombatDamageArgs> = new Listener();
  public DashSkillDamage: Listener<ICombatDamageArgs> = new Listener();
  public DashSkillHeal: Listener<ICombatHealArgs> = new Listener();
  public DashSkillCreateShield: Listener<ICombatShieldArgs> = new Listener();

  public ElementalSkillStarted: Listener<SkillListenerArgs> = new Listener();
  public ElementalSkillEnded: Listener<SkillListenerArgs> = new Listener();
  public ElementalSkillBeforeDamage: Listener<ICombatDamageArgs> = new Listener();
  public ElementalSkillDamage: Listener<ICombatDamageArgs> = new Listener();
  public ElementalSkillHeal: Listener<ICombatHealArgs> = new Listener();
  public ElementalSkillCreateShield: Listener<ICombatShieldArgs> = new Listener();

  public BurstSkillStarted: Listener<SkillListenerArgs> = new Listener();
  public BurstSkillEnded: Listener<SkillListenerArgs> = new Listener();
  public BurstSkillBeforeDamage: Listener<ICombatDamageArgs> = new Listener();
  public BurstSkillDamage: Listener<ICombatDamageArgs> = new Listener();
  public BurstSkillHeal: Listener<ICombatHealArgs> = new Listener();
  public BurstSkillCreateShield: Listener<ICombatShieldArgs> = new Listener();
}
