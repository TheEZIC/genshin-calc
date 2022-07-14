import TransformativeElementalReaction from "@/ElementalReactions/TransformativeElementalReaction";
import ElementalStatus from "@/ElementalStatuses/ElementalStatus";
import {IElementalReactionArgs, IElementalReactionManagerArgs} from "@/ElementalReactions/ElementalReaction";
import CombatActions, {ICombatDamageArgs} from "@/Skills/CombatActions";

export default class SwirlReaction extends TransformativeElementalReaction {
  public triggerMultiplier: number = 0.625;
  public readonly baseDamageMultiplier: number = 1.2;

  private calcSwirledElement(elementalStatus: ElementalStatus, anemoStatus: ElementalStatus) {
    const elementalUnitsRemaining = (elementalStatus.frames - elementalStatus.currentFrame) / elementalStatus.unitCapacity;
    const gaugesReaction = elementalUnitsRemaining >= 0.5 * anemoStatus.units
      ? anemoStatus.units
      : elementalUnitsRemaining;

    const units = (gaugesReaction - 0.04) * 1.25 + 1;
    const clone = elementalStatus.clone as typeof elementalStatus;
    clone.units = units;

    return clone;
  }

  public doDamage({character, damageCalculator, entity, source, trigger}: IElementalReactionArgs): number {
    const combat = new CombatActions(damageCalculator);
    const damage = this.baseDamageMultiplier
      * this.calcLvlMultiplier(character)
      * (1 + (
        character.calculatorStats.elementalMastery.transformativeReactionBonus +
        character.calculatorStats.swirlReactionDmgBonus.calc()
      ) / 100);

    const damageArgs: ICombatDamageArgs = {
      character,
      source,
      damageVision: trigger.visionType,
      target: entity,
      value: damage,
    }

    combat.doDamage(damageArgs);

    return damage;
  }

  public applyBonusDamage(args: IElementalReactionArgs): number {
    let {damageCalculator, trigger} = args;

    const {entities} = damageCalculator.roster;
    const anemoStatus = trigger;

    for (let i = 0; i < entities.length; i++) {
      const entity1Statuses = entities[i].elementalStatuses;

      for (let entity1Status of entity1Statuses) {
        for (let j = 0; j < entities.length; j++) {
          if (i - j - 1 >= 0 || i === j) {
            continue;
          }

          this.elementalReactionManager.applyReaction({
            ...args,
            entity: entities[j],
            fromSwirl: true,
            elementalStatus: this.calcSwirledElement(entity1Status, anemoStatus),
          });
        }
      }
    }

    this.doDamage(args);

    return 0;
  }
}
