import TransformativeElementalReaction from "@/ElementalReactions/TransformativeElementalReaction";
import {IElementalReactionArgs, IElementalReactionManagerArgs} from "@/ElementalReactions/ElementalReaction";
import CombatActions, {ICombatDamageArgs} from "@/Skills/CombatActions";
import {SuperConductDebuff} from "@/ElementalReactions/List/Effects/SuperConductDebuff";
import Enemy from "@/Entities/Enemies/Enemy";
import {VisionType} from "@/VisionType";

export default class SuperConductReaction extends TransformativeElementalReaction {
  public triggerMultiplier: number = 1.25;
  public readonly baseDamageMultiplier: number = 1;

  private debuff = new SuperConductDebuff();

  public doDamage({character, damageCalculator, entity, source}: IElementalReactionArgs): number {
    const combat = new CombatActions(damageCalculator);
    const damage = this.baseDamageMultiplier
      * this.calcLvlMultiplier(character)
      * (1 + (
        character.calculatorStats.elementalMastery.transformativeReactionBonus +
        character.calculatorStats.superConductReactionDmgBonus.calc()
      ) / 100);

    const damageArgs: ICombatDamageArgs = {
      character,
      source,
      damageVision: VisionType.Cryo,
      target: entity,
      value: damage,
    }

    combat.doDamage(damageArgs);

    return damage;
  }

  applyBonusDamage(args: IElementalReactionArgs): number {
    this.doDamage(args);

    if (args.entity instanceof Enemy) {
      this.debuff.activate(args.entity);
    }

    return 0;
  }
}
