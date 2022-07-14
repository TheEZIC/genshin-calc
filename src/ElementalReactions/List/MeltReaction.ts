import AmplifyingElementalReaction from "@/ElementalReactions/AmplifyingElementalReaction";
import {IElementalReactionArgs, IElementalReactionManagerArgs} from "@/ElementalReactions/ElementalReaction";

export default class MeltReaction extends AmplifyingElementalReaction {
  public triggerMultiplier: number = 1.25 * 2;
  public readonly damageMultiplier: number = 2;

  applyBonusDamage({character ,damage}: IElementalReactionArgs): number {
    return damage * this.damageMultiplier
      * (1 + (
        character.calculatorStats.elementalMastery.multipliedReactionBonus +
        character.calculatorStats.meltReactionDmgBonus.calc()
      ) / 100);
  }
}
