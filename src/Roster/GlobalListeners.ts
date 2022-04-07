import {injectable} from "inversify";
import Listener from "@/Helpers/Listener";
import Character from "@/Entities/Characters/Character";
import Skill from "@/Skills/Skill";
import Effect from "@/Effects/Effect";

export interface IOnSkillAction {
  character: Character;
  comment: string;
  skill: Skill;
  value: number;
}

export interface IOnAnySkill {
  character: Character;
  skill: Skill;
  hash: string;
}

export interface IOnAnyEffect {
  effect: Effect<any>;
}

@injectable()
export default class GlobalListeners {
  public onDamage: Listener<IOnSkillAction> = new Listener<IOnSkillAction>();
  public onHeal: Listener<IOnSkillAction> = new Listener<IOnSkillAction>();
  public onCreateShield: Listener<IOnSkillAction> = new Listener<IOnSkillAction>();

  public onSkillStarted: Listener<IOnAnySkill> = new Listener<IOnAnySkill>();
  public onSkillEnded: Listener<IOnAnySkill> = new Listener<IOnAnySkill>();

  public onEffectStarted: Listener<IOnAnyEffect> = new Listener<IOnAnyEffect>();
  public onEffectReactivate: Listener<IOnAnyEffect> = new Listener<IOnAnyEffect>();
  public onEffectEnded: Listener<IOnAnyEffect> = new Listener<IOnAnyEffect>();
}
