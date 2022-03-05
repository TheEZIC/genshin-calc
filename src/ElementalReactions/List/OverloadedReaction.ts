
import TransformativeElementalReaction from "@/ElementalReactions/TransformativeElementalReaction";
import Character from "@/Entities/Characters/Character";
import Skill from "@/Skills/Skill";

export default class OverloadedReaction extends TransformativeElementalReaction {
  public triggerMultiplier: number = 1.25;
  protected baseMultiplier: number = 4;

  applyBonusDamage(character: Character, skill: Skill, damage: number): number {
    return damage
      / character.calculatorStats.critChance.critEffect
      * character.calculatorStats.elementalMastery.transformativeReactionBonus;
  }
}
