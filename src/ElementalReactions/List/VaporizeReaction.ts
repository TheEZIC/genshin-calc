import MultipliedElementalReaction from "@/ElementalReactions/MultipliedElementalReaction";
import Character from "@/Entities/Characters/Character";
import Skill from "@/Skills/Skill";

export default class VaporizeReaction extends MultipliedElementalReaction {
  public multiplier: number = 1.5;

  applyBonusDamage(character: Character, skill: Skill, damage: number): number {
    return damage * (this.multiplier + character.calculatorStats.elementalMastery.vaporizeAndMeltReactionBonus);
  }
}
