import MultipliedElementalReaction from "@/ElementalReactions/MultipliedElementalReaction";
import Character from "@/Entities/Characters/Character";

export default class ReverseMeltReaction extends MultipliedElementalReaction {
  public multiplier: number = 1.5;

  applyBonusDamage(character: Character, damage: number): number {
    return damage * (this.multiplier + character.calculatorStats.elementalMastery.vaporizeAndMeltReactionBonus);
  }
}
