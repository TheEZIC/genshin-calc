import MultipliedElementalReaction from "@/ElementalReactions/MultipliedElementalReaction";
import Character from "@/Characters/Character";

export default class ReverseVaporizeReaction extends MultipliedElementalReaction {
  public multiplier: number = 2;

  applyBonusDamage(character: Character, damage: number): number {
    return damage * (this.multiplier + character.calculatorStats.elementalMastery.vaporizeAndMeltReactionBonus);
  }
}
