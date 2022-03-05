import MultipliedElementalReaction from "@/ElementalReactions/MultipliedElementalReaction";
import Character from "@/Entities/Characters/Character";
import Skill from "@/Skills/Skill";

export default class MeltReaction extends MultipliedElementalReaction {
  public triggerMultiplier: number = 1.25 * 2;
  protected damageMultiplier: number = 2;

  applyBonusDamage(character: Character, skill: Skill, damage: number): number {
    return damage * this.damageMultiplier
      * (1 + (character.calculatorStats.elementalMastery.multipliedReactionBonus) / 100);
  }
}
