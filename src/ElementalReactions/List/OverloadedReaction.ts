import TransformativeElementalReaction from "@/ElementalReactions/TransformativeElementalReaction";
import {IElementalReactionArgs} from "@/ElementalReactions/ElementalReaction";

export default class OverloadedReaction extends TransformativeElementalReaction {
  public triggerMultiplier: number = 1.25;
  public readonly baseDamageMultiplier: number = 4;

  applyBonusDamage({character, damage}: IElementalReactionArgs): number {
    return this.baseDamageMultiplier
      * this.calcLvlMultiplier(character)
      * (1 + (
        character.calculatorStats.elementalMastery.transformativeReactionBonus +
        character.calculatorStats.overloadedReactionDmgBonus.calc()
      ) / 100)
  }
}
