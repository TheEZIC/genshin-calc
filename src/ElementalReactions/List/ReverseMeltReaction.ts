import MultipliedElementalReaction from "@/ElementalReactions/MultipliedElementalReaction";
import Character from "@/Characters/Character";

export default class ReverseMeltReaction extends MultipliedElementalReaction {
  public multiplier: number = 1.5;

  calcBonusDamage(character: Character, damage: number): number {
    return damage * (this.multiplier + character.calculatorStats.elementalMastery.vaporizeAndMeltReactionBonus);
  }
}
