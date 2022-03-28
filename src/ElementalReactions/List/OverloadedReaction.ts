import TransformativeElementalReaction from "@/ElementalReactions/TransformativeElementalReaction";
import {IElementalReactionArgs} from "@/ElementalReactions/ElementalReaction";

export default class OverloadedReaction extends TransformativeElementalReaction {
  public triggerMultiplier: number = 1.25;
  public readonly baseMultiplier: number = 4;

  applyBonusDamage({character, damage}: IElementalReactionArgs): number {
    return this.baseMultiplier
      * this.calcLvlMultiplier(character)
      * (1 + (character.calculatorStats.elementalMastery.transformativeReactionBonus) / 100)
  }
}
