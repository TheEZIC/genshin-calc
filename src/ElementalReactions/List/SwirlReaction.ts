import {container, ContainerBindings} from "@/inversify.config";
import Roster from "@/Roster/Roster";
import TransformativeElementalReaction from "@/ElementalReactions/TransformativeElementalReaction";
import ElementalStatus from "@/ElementalStatuses/ElementalStatus";
import Entity from "@/Entities/Entity";
import {IElementalReactionArgs} from "@/ElementalReactions/ElementalReaction";

export default class SwirlReaction extends TransformativeElementalReaction {
  public triggerMultiplier: number = 0.625;
  public readonly baseDamageMultiplier: number = 1.2;

  private roster: Roster = container.get(ContainerBindings.Roster);

  private getEntityStatus(entity: Entity): ElementalStatus | undefined {
    return entity.ongoingEffects.find(e => e instanceof ElementalStatus) as ElementalStatus | undefined;
  }

  private calcSwirledElement(elementalStatus: ElementalStatus, anemoStatus: ElementalStatus) {
    const elementalUnitsRemaining = (elementalStatus.framesDuration - elementalStatus.currentFrame) / elementalStatus.unitCapacity;
    const gaugesReaction = elementalUnitsRemaining >= 0.5 * anemoStatus.units
      ? anemoStatus.units
      : elementalUnitsRemaining;

    const units = (gaugesReaction - 0.04) * 1.25 + 1;

    return elementalStatus
      .clone
      .recreate(units);
  }

  applyBonusDamage(args: IElementalReactionArgs): number {
    const {enemies} = this.roster;
    const anemoStatus = args.elementalStatus!!;

    for (let entity1 of enemies) {
      const entity1Status = this.getEntityStatus(entity1);

      if (entity1Status) {
        for (let entity2 of enemies) {
          const entity2Status = this.getEntityStatus(entity2);

          if (entity1 === entity2 || entity1Status === entity2Status) {
            continue;
          }

          this.elementalReactionManager.applyReaction({
            ...args,
            entity: entity2,
            elementalStatus: this.calcSwirledElement(entity1Status, anemoStatus),
          });
        }
      }
    }

    return this.baseDamageMultiplier
      * this.calcLvlMultiplier(args.character)
      * (1 + (args.character.calculatorStats.elementalMastery.transformativeReactionBonus) / 100)
  }
}
