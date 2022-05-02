import Listener from "@/Helpers/Listener";
import Character from "@/Entities/Characters/Character";
import Skill from "@/Skills/Skill";
import Effect from "@/Effects/Effect";
import ElementalStatus from "@/ElementalStatuses/ElementalStatus";
import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";

export interface IOnSkillAction {
  character: Character;
  comment: string;
  skill: Skill;
  value: number;
}

export interface IOnSkillDamage extends IOnSkillAction {
  elementalStatus?: ElementalStatus;
}

export interface IOnAnySkill {
  character: Character;
  skill: Skill;
  hash: string;
}

export interface IOnAnyEffect<T extends IWithOngoingEffects = any> {
  entity: T;
  effect: Effect<T>;
}
export default class GlobalListeners {
  private static _instance: GlobalListeners | null = null;

  public static get instance() {
    if (!this._instance) {
      this._instance = new this();
    }

    return this._instance;
  }

  public onDamage: Listener<IOnSkillDamage> = new Listener<IOnSkillDamage>();
  public onHeal: Listener<IOnSkillAction> = new Listener<IOnSkillAction>();
  public onCreateShield: Listener<IOnSkillAction> = new Listener<IOnSkillAction>();

  public onSkillStarted: Listener<IOnAnySkill> = new Listener<IOnAnySkill>();
  public onSkillEnded: Listener<IOnAnySkill> = new Listener<IOnAnySkill>();

  public onEffectStarted: Listener<IOnAnyEffect> = new Listener<IOnAnyEffect>();
  public onEffectReactivate: Listener<IOnAnyEffect> = new Listener<IOnAnyEffect>();
  public onEffectEnded: Listener<IOnAnyEffect> = new Listener<IOnAnyEffect>();

  public reset() {

  }
}
