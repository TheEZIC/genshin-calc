import MultipliedElementalReaction from "@/ElementalReactions/MultipliedElementalReaction";
import Character from "@/Entities/Characters/Character";

export default class MeltReaction extends MultipliedElementalReaction {
  public multiplier: number = 2;

  applyBonusDamage(character: Character): number {
    return this.multiplier + character.calculatorStats.elementalMastery.vaporizeAndMeltReactionBonus;
  }
}
