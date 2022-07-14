import TransformativeElementalReaction from "@/ElementalReactions/TransformativeElementalReaction";
import {IElementalReactionArgs, IElementalReactionManagerArgs} from "@/ElementalReactions/ElementalReaction";
import CombatActions, {ICombatDamageArgs} from "@/Skills/CombatActions";
import {VisionType} from "@/VisionType";

export default class OverloadedReaction extends TransformativeElementalReaction {
  public triggerMultiplier: number = 1.25;
  public readonly baseDamageMultiplier: number = 4;

  public doDamage({character, damageCalculator, entity, source}: IElementalReactionArgs): number {
    const combat = new CombatActions(damageCalculator);
    const damage = this.baseDamageMultiplier
      * this.calcLvlMultiplier(character)
      * (1 + (
        character.calculatorStats.elementalMastery.transformativeReactionBonus +
        character.calculatorStats.overloadedReactionDmgBonus.calc()
      ) / 100);

    const damageArgs: ICombatDamageArgs = {
      character,
      source,
      damageVision: VisionType.Pyro,
      target: entity,
      value: damage,
    }

    combat.doDamage(damageArgs);

    return damage;
  }

  applyBonusDamage(args: IElementalReactionArgs): number {
    this.doDamage(args);
    return 0;
  }
}
