import MultipliedElementalReaction from "@/ElementalReactions/MultipliedElementalReaction";
import Character from "@/Characters/Character";

export default class MeltReaction extends MultipliedElementalReaction {
  public multiplier: number = 2;

  calcBonusDamage(character: Character): number {
    return this.multiplier + character.calculatorStats.elementalMastery.vaporizeAndMeltReactionBonus;
  }
}
