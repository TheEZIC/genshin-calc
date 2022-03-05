import TransformativeElementalReaction from "@/ElementalReactions/TransformativeElementalReaction";
import Character from "@/Entities/Characters/Character";
import Skill from "@/Skills/Skill";

export default class SuperConductReaction extends TransformativeElementalReaction {
  public triggerMultiplier: number = 1.25;
  protected baseMultiplier: number = 1;

  applyBonusDamage(character: Character, skill: Skill, damage: number): number {
    return this.baseMultiplier
      * this.calcLvlMultiplier(character)
      * (1 + (character.calculatorStats.elementalMastery.transformativeReactionBonus) / 100)
  }
}
