import Listener from "@/Helpers/Listener";
import Character from "@/Characters/Character";

export interface ISkillListenerArgs {
  character: Character;
  startTime: number;
}

export default class SkillsListeners {
  public NormalAttackStarted: Listener<ISkillListenerArgs> = new Listener();
  public HoldAttackStarted: Listener<ISkillListenerArgs> = new Listener();
  public PlungeAttackStarted: Listener<ISkillListenerArgs> = new Listener();

  public NormalAttackEnded: Listener<ISkillListenerArgs> = new Listener();
  public HoldAttackEnded: Listener<ISkillListenerArgs> = new Listener();
  public PlungeAttackEnded: Listener<ISkillListenerArgs> = new Listener();

  public DashSkillStarted: Listener<ISkillListenerArgs> = new Listener();

  public DashSkillEnded: Listener<ISkillListenerArgs> = new Listener();

  public ElementalSkillStarted: Listener<ISkillListenerArgs> = new Listener();
  public BurstSkillStarted: Listener<ISkillListenerArgs> = new Listener();

  public ElementalSkillEnded: Listener<ISkillListenerArgs> = new Listener();
  public BurstSkillEnded: Listener<ISkillListenerArgs> = new Listener();
}
