import Listener from "@/Helpers/Listener";
import Effect from "@/Effects/Effect";
import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";
import SkillListenerArgs from "@/Skills/Args/SkillListenerArgs";
import {IOnSkillAction, IOnSkillDamage} from "@/Roster/GlobalListeners";

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
  public NormalAttackBeforeDamage: Listener<IOnSkillDamage> = new Listener();
  public NormalAttackDamage: Listener<IOnSkillDamage> = new Listener();
  public NormalAttackHeal: Listener<IOnSkillAction> = new Listener();
  public NormalAttackCreateShield: Listener<IOnSkillAction> = new Listener();

  public HoldAttackStarted: Listener<SkillListenerArgs> = new Listener();
  public HoldAttackEnded: Listener<SkillListenerArgs> = new Listener();
  public HoldAttackBeforeDamage: Listener<IOnSkillDamage> = new Listener();
  public HoldAttackDamage: Listener<IOnSkillDamage> = new Listener();
  public HoldAttackHeal: Listener<IOnSkillAction> = new Listener();
  public HoldAttackCreateShield: Listener<IOnSkillAction> = new Listener();

  public PlungeAttackStarted: Listener<SkillListenerArgs> = new Listener();
  public PlungeAttackEnded: Listener<SkillListenerArgs> = new Listener();
  public PlungeAttackBeforeDamage: Listener<IOnSkillDamage> = new Listener();
  public PlungeAttackDamage: Listener<IOnSkillDamage> = new Listener();
  public PlungeAttackHeal: Listener<IOnSkillAction> = new Listener();
  public PlungeAttackCreateShield: Listener<IOnSkillAction> = new Listener();

  public DashSkillStarted: Listener<SkillListenerArgs> = new Listener();
  public DashSkillEnded: Listener<SkillListenerArgs> = new Listener();
  public DashSkillBeforeDamage: Listener<IOnSkillDamage> = new Listener();
  public DashSkillDamage: Listener<IOnSkillDamage> = new Listener();
  public DashSkillHeal: Listener<IOnSkillAction> = new Listener();
  public DashSkillCreateShield: Listener<IOnSkillAction> = new Listener();

  public ElementalSkillStarted: Listener<SkillListenerArgs> = new Listener();
  public ElementalSkillEnded: Listener<SkillListenerArgs> = new Listener();
  public ElementalSkillBeforeDamage: Listener<IOnSkillDamage> = new Listener();
  public ElementalSkillDamage: Listener<IOnSkillDamage> = new Listener();
  public ElementalSkillHeal: Listener<IOnSkillAction> = new Listener();
  public ElementalSkillCreateShield: Listener<IOnSkillAction> = new Listener();

  public BurstSkillStarted: Listener<SkillListenerArgs> = new Listener();
  public BurstSkillEnded: Listener<SkillListenerArgs> = new Listener();
  public BurstSkillBeforeDamage: Listener<IOnSkillDamage> = new Listener();
  public BurstSkillDamage: Listener<IOnSkillDamage> = new Listener();
  public BurstSkillHeal: Listener<IOnSkillAction> = new Listener();
  public BurstSkillCreateShield: Listener<IOnSkillAction> = new Listener();
}
