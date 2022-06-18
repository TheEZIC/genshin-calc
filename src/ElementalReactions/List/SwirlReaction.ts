import TransformativeElementalReaction from "@/ElementalReactions/TransformativeElementalReaction";
import ElementalStatus from "@/ElementalStatuses/ElementalStatus";
import Entity from "@/Entities/Entity";
import {IElementalReactionArgs} from "@/ElementalReactions/ElementalReaction";

export default class SwirlReaction extends TransformativeElementalReaction {
  public triggerMultiplier: number = 0.625;
  public readonly baseDamageMultiplier: number = 1.2;

  private getEntityStatus(entity: Entity): ElementalStatus | undefined {
    return entity.ongoingEffects.find(e => e instanceof ElementalStatus) as ElementalStatus | undefined;
  }

  private calcSwirledElement(elementalStatus: ElementalStatus, anemoStatus: ElementalStatus) {
    const elementalUnitsRemaining = (elementalStatus.frames - elementalStatus.currentFrame) / elementalStatus.unitCapacity;
    const gaugesReaction = elementalUnitsRemaining >= 0.5 * anemoStatus.units
      ? anemoStatus.units
      : elementalUnitsRemaining;

    const units = (gaugesReaction - 0.04) * 1.25 + 1;
    const clone = elementalStatus.clone as typeof elementalStatus;

    return clone.recreate(units);
  }

  applyBonusDamage(args: IElementalReactionArgs): number {
    const {character} = args;
    const {entities} = args.damageCalculator.roster;
    const anemoStatus = args.elementalStatus!!;

    for (let i = 0; i < entities.length; i++) {
      const entity1Status = this.getEntityStatus(entities[i]);

      if (entity1Status) {
        for (let j = 0; j < entities.length; j++) {
          if (i - j - 1 >= 0 || i === j) {
            continue;
          }

          this.elementalReactionManager.applyReaction({
            ...args,
            entity: entities[j],
            elementalStatus: this.calcSwirledElement(entity1Status, anemoStatus),
          });
        }
      }
    }

    return this.baseDamageMultiplier
      * this.calcLvlMultiplier(args.character)
      * (1 + (
        args.character.calculatorStats.elementalMastery.transformativeReactionBonus +
        character.calculatorStats.swirlReactionDmgBonus.calc()
      ) / 100)
  }
}
