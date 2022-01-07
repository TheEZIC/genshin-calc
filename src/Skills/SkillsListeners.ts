import Listener from "@/Helpers/Listener";
import Character from "@/Characters/Character";

export interface ISkillListenerArgs<T> {
  entity: T;
  startTime: number;
}

export default class SkillsListeners<T> {
  public NormalAttackStarted: Listener<ISkillListenerArgs<T>> = new Listener();
  public HoldAttackStarted: Listener<ISkillListenerArgs<T>> = new Listener();
  public PlungeAttackStarted: Listener<ISkillListenerArgs<T>> = new Listener();

  public NormalAttackEnded: Listener<ISkillListenerArgs<T>> = new Listener();
  public HoldAttackEnded: Listener<ISkillListenerArgs<T>> = new Listener();
  public PlungeAttackEnded: Listener<ISkillListenerArgs<T>> = new Listener();

  public DashSkillStarted: Listener<ISkillListenerArgs<T>> = new Listener();

  public DashSkillEnded: Listener<ISkillListenerArgs<T>> = new Listener();

  public ElementalSkillStarted: Listener<ISkillListenerArgs<T>> = new Listener();
  public BurstSkillStarted: Listener<ISkillListenerArgs<T>> = new Listener();

  public ElementalSkillEnded: Listener<ISkillListenerArgs<T>> = new Listener();
  public BurstSkillEnded: Listener<ISkillListenerArgs<T>> = new Listener();
}
