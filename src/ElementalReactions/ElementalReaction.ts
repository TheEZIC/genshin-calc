import Character from "@/Entities/Characters/Character";
import Skill from "@/Skills/Skill";
import Listener from "@/Helpers/Listener";

export interface IOnReactionArgs {
  reaction: ElementalReaction;
  character: Character;
  skill: Skill;
}

export default abstract class ElementalReaction {
  public onExecuteListener: Listener<IOnReactionArgs> = new Listener<IOnReactionArgs>();

  public abstract applyBonusDamage(character: Character, skill: Skill, damage: number): number;

  public execute(character: Character, skill: Skill, damage: number) {
    this.onExecuteListener.notifyAll({reaction: this, character, skill});
    this.applyBonusDamage(character, skill, damage);
  }
}
