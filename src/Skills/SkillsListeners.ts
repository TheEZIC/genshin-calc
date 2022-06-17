import Listener from "@/Helpers/Listener";
import Character from "@/Entities/Characters/Character";
import Effect from "@/Effects/Effect";
import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";
import SkillArgs from "@/Skills/Args/SkillArgs";

export interface ISkillListenerArgs<T> {
  entity: T;
}

export interface IAnySKillListenerArgs<T extends IWithOngoingEffects> {
  entity: T;
  effect: Effect<T>;
}

export default class SkillsListeners {
  public NormalAttackStarted: Listener<SkillArgs> = new Listener();
  public HoldAttackStarted: Listener<SkillArgs> = new Listener();
  public PlungeAttackStarted: Listener<SkillArgs> = new Listener();

  public NormalAttackEnded: Listener<SkillArgs> = new Listener();
  public HoldAttackEnded: Listener<SkillArgs> = new Listener();
  public PlungeAttackEnded: Listener<SkillArgs> = new Listener();

  public DashSkillStarted: Listener<SkillArgs> = new Listener();

  public DashSkillEnded: Listener<SkillArgs> = new Listener();

  public ElementalSkillStarted: Listener<SkillArgs> = new Listener();
  public BurstSkillStarted: Listener<SkillArgs> = new Listener();

  public ElementalSkillEnded: Listener<SkillArgs> = new Listener();
  public BurstSkillEnded: Listener<SkillArgs> = new Listener();
}
