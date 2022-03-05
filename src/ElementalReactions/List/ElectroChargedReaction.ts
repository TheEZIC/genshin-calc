import ElementalReaction from "@/ElementalReactions/ElementalReaction";
import TransformativeElementalReaction from "@/ElementalReactions/TransformativeElementalReaction";
import Character from "@/Entities/Characters/Character";
import Skill from "@/Skills/Skill";

export default class ElectroChargedReaction extends TransformativeElementalReaction {
  public triggerMultiplier: number = 0.4;
  protected baseMultiplier: number = 2.4;

  public applyBonusDamage(character: Character, skill: Skill, damage: number): number {
    return this.baseMultiplier
      * this.calcLvlMultiplier(character)
      * (1 + (character.calculatorStats.elementalMastery.transformativeReactionBonus) / 100)
  }
}
