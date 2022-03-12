import MultipliedElementalReaction from "@/ElementalReactions/MultipliedElementalReaction";
import {IElementalReactionArgs} from "@/ElementalReactions/ElementalReaction";

export default class ReverseVaporizeReaction extends MultipliedElementalReaction {
  public triggerMultiplier: number = 1.25 / 2;
  protected damageMultiplier: number = 2;

  applyBonusDamage({character, damage}: IElementalReactionArgs): number {
    return damage * this.damageMultiplier
      * (1 + (character.calculatorStats.elementalMastery.multipliedReactionBonus) / 100);
  }
}
