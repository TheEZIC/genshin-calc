import Listener from "@/Helpers/Listener";
import Character from "@/Characters/Character";
import Effect from "@/Effects/Effect";
import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";

export interface ISkillListenerArgs<T> {
  entity: T;
  startTime: number;
}

export interface IAnySKillListenerArgs<T extends IWithOngoingEffects> {
  entity: T;
  startTime: number;
  effect: Effect<T>;
}

export default class SkillsListeners {
  public NormalAttackStarted: Listener<ISkillListenerArgs<Character>> = new Listener();
  public HoldAttackStarted: Listener<ISkillListenerArgs<Character>> = new Listener();
  public PlungeAttackStarted: Listener<ISkillListenerArgs<Character>> = new Listener();

  public NormalAttackEnded: Listener<ISkillListenerArgs<Character>> = new Listener();
  public HoldAttackEnded: Listener<ISkillListenerArgs<Character>> = new Listener();
  public PlungeAttackEnded: Listener<ISkillListenerArgs<Character>> = new Listener();

  public DashSkillStarted: Listener<ISkillListenerArgs<Character>> = new Listener();

  public DashSkillEnded: Listener<ISkillListenerArgs<Character>> = new Listener();

  public ElementalSkillStarted: Listener<ISkillListenerArgs<Character>> = new Listener();
  public BurstSkillStarted: Listener<ISkillListenerArgs<Character>> = new Listener();

  public ElementalSkillEnded: Listener<ISkillListenerArgs<Character>> = new Listener();
  public BurstSkillEnded: Listener<ISkillListenerArgs<Character>> = new Listener();
}
