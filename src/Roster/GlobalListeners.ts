import Listener from "@/Helpers/Listener";
import Character from "@/Entities/Characters/Character";
import Skill from "@/Skills/Skill";
import {injectable} from "inversify";

export interface IOnSkillAction {
  character: Character;
  skill: Skill;
  value: number;
}

export interface IOnAnySkill {
  character: Character;
  skill: Skill;
  hash: string;
}

@injectable()
export default class GlobalListeners {
  public onDamage: Listener<IOnSkillAction> = new Listener<IOnSkillAction>();
  public onHeal: Listener<IOnSkillAction> = new Listener<IOnSkillAction>();
  public onCreateShield: Listener<IOnSkillAction> = new Listener<IOnSkillAction>();

  public onAnySkillStarted: Listener<IOnAnySkill> = new Listener<IOnAnySkill>();
  public onAnySkillEnded: Listener<IOnAnySkill> = new Listener<IOnAnySkill>();
}
