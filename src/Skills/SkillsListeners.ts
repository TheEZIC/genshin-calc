import Listener from "@/Helpers/Listener";
import Character from "@/Characters/Character";

export interface ISkillStartedListenerArgs {
  character: Character;
  startTime: number;
}

export default class SkillsListeners {
  public NormalAttackStarted: Listener<ISkillStartedListenerArgs> = new Listener();
  public HoldAttackStarted: Listener<ISkillStartedListenerArgs> = new Listener();
  public PlungeAttackStarted: Listener<ISkillStartedListenerArgs> = new Listener();

  public DashSkillStarted: Listener<ISkillStartedListenerArgs> = new Listener();

  public ElementalSkillStarted: Listener<ISkillStartedListenerArgs> = new Listener();
  public BurstSkillStarted: Listener<ISkillStartedListenerArgs> = new Listener();
}