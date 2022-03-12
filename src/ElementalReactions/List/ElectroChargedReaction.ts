import TransformativeElementalReaction from "@/ElementalReactions/TransformativeElementalReaction";
import {IElementalReactionArgs} from "@/ElementalReactions/ElementalReaction";

export default class ElectroChargedReaction extends TransformativeElementalReaction {
  public triggerMultiplier: number = 0.4;
  public readonly baseMultiplier: number = 2.4;

  public applyBonusDamage({character}: IElementalReactionArgs): number {
    return this.baseMultiplier
      * this.calcLvlMultiplier(character)
      * (1 + (character.calculatorStats.elementalMastery.transformativeReactionBonus) / 100)
  }
}
