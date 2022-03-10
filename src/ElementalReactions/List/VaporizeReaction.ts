import MultipliedElementalReaction from "@/ElementalReactions/MultipliedElementalReaction";
import Character from "@/Entities/Characters/Character";
import Skill from "@/Skills/Skill";
import {IElementalReactionArgs} from "@/ElementalReactions/ElementalReaction";

export default class VaporizeReaction extends MultipliedElementalReaction {
  public triggerMultiplier: number = 1.25 * 2;
  protected damageMultiplier: number = 1.5;

  applyBonusDamage({character, damage}: IElementalReactionArgs): number {
    return damage * this.damageMultiplier
      * (1 + (character.calculatorStats.elementalMastery.multipliedReactionBonus) / 100);
  }
}
