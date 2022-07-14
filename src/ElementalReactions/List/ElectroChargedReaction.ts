import TransformativeElementalReaction from "@/ElementalReactions/TransformativeElementalReaction";
import {IElementalReactionArgs, IElementalReactionManagerArgs} from "@/ElementalReactions/ElementalReaction";
import CombatActions, {ICombatDamageArgs} from "@/Skills/CombatActions";
import {VisionType} from "@/VisionType";
import HydroStatus from "@/ElementalStatuses/List/HydroStatus";
import ElectroStatus from "@/ElementalStatuses/List/ElectroStatus";

export default class ElectroChargedReaction extends TransformativeElementalReaction {
  public triggerMultiplier: number = 0.4;
  public readonly baseDamageMultiplier: number = 2.4;

  public doDamage({character, damageCalculator, entity, source}: IElementalReactionArgs): number {
    const combat = new CombatActions(damageCalculator);
    const damage = this.baseDamageMultiplier
      * this.calcLvlMultiplier(character)
      * (1 + (
        character.calculatorStats.elementalMastery.transformativeReactionBonus +
        character.calculatorStats.electroChargedReactionDmgBonus.calc()
      ) / 100);

    let totalDamage = damage;

    const damageArgs: ICombatDamageArgs = {
      character,
      source,
      damageVision: VisionType.Electro,
      target: entity,
      value: damage,
    }

    combat.doDamage(damageArgs)

    const otherEntities = damageCalculator.roster.entities.filter(e => e !== entity);
    const entitiesByHydro = otherEntities.filter(e => e.getElementalStatus(HydroStatus));

    for (let entityByHydro of entitiesByHydro) {
      totalDamage += damage;

      combat.doDamage({
        ...damageArgs,
        target: entityByHydro,
      });
    }

    return damage
  }

  public applyBonusDamage(args: IElementalReactionArgs): number {
    return 0;
  }

  override execute(args: IElementalReactionArgs): number {
    const {entity, aura, trigger, damageCalculator} = args;
    trigger.activate(entity);

    const unitCapacity = Math.min(aura.unitCapacity, trigger.unitCapacity);
    const remainingDuration = Math.min(aura.remainingDuration, trigger.remainingDuration);
    const remainingDurationAfterFirstTick = remainingDuration - this.triggerMultiplier * unitCapacity;

    let ticksCount = Math.floor(remainingDurationAfterFirstTick  / (this.triggerMultiplier * unitCapacity + 60)) + 1;

    if (remainingDurationAfterFirstTick % (this.triggerMultiplier * unitCapacity + 60) > 30) {
      ticksCount++;
    }

    for (let i = 0; i < ticksCount; i++) {
      damageCalculator.addDelayedAction({
        delay: 60 * i,
        run: (damageCalculator) => {
          const electroStatus = entity.ongoingEffects.find(e => e instanceof ElectroStatus) as ElectroStatus;
          const hydroStatus = entity.ongoingEffects.find(e => e instanceof HydroStatus) as HydroStatus;

          if (electroStatus && hydroStatus) {
            electroStatus.react(electroStatus, this, true);
            hydroStatus.react(hydroStatus, this, true);

            this.doDamage(args);
          }
        }
      });
    }

    return 0;
  }
}
