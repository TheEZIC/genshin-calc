import ElementalReaction from "@/ElementalReactions/ElementalReaction";
import Character from "@/Entities/Characters/Character";
import Skill from "@/Skills/Skill";

export default class CrystallizeReaction extends ElementalReaction {
  public triggerMultiplier: number = 0.625;

  public applyBonusDamage(character: Character, skill: Skill, damage: number): number {
    return 0;
  }
}
