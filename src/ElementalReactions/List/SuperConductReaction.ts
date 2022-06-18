import TransformativeElementalReaction from "@/ElementalReactions/TransformativeElementalReaction";
import {IElementalReactionArgs} from "@/ElementalReactions/ElementalReaction";

export default class SuperConductReaction extends TransformativeElementalReaction {
  public triggerMultiplier: number = 1.25;
  public readonly baseDamageMultiplier: number = 1;

  applyBonusDamage({character}: IElementalReactionArgs): number {
    return this.baseDamageMultiplier
      * this.calcLvlMultiplier(character)
      * (1 + (
        character.calculatorStats.elementalMastery.transformativeReactionBonus +
        character.calculatorStats.superConductReactionDmgBonus.calc()
      ) / 100)
  }
}
