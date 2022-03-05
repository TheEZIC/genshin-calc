import ElementalReaction from "@/ElementalReactions/ElementalReaction";
import Character from "@/Entities/Characters/Character";
import Skill from "@/Skills/Skill";

export default class FrozenReaction extends ElementalReaction {
  public triggerMultiplier: number = 1.25;

  public applyBonusDamage(character: Character, skill: Skill, damage: number): number {
    return 0;
  }
}
