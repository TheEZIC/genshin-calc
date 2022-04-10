import {container} from "@/inversify.config";
import Roster from "@/Roster/Roster";
import TransformativeElementalReaction from "@/ElementalReactions/TransformativeElementalReaction";
import ElementalStatus from "@/ElementalStatuses/ElementalStatus";
import Entity from "@/Entities/Entity";
import {IElementalReactionArgs} from "@/ElementalReactions/ElementalReaction";

export default class SwirlReaction extends TransformativeElementalReaction {
  public triggerMultiplier: number = 0.625;
  public readonly baseMultiplier: number = 1.2;

  private roster: Roster = container.get("Roster");

  private getEntityStatus(entity: Entity): ElementalStatus | undefined {
    return entity.ongoingEffects.find(e => e instanceof ElementalStatus) as ElementalStatus | undefined;
  }

  private calcSwirledElement(elementalStatus: ElementalStatus, anemoStatus: ElementalStatus) {
    const framesAfter = elementalStatus.currentFrame;
    const elementalUnitsRemaining = framesAfter / 60 / elementalStatus.parsedDecay;

    const gaugesReaction = elementalUnitsRemaining >= 0.5 * anemoStatus.units
      ? anemoStatus.units
      : elementalUnitsRemaining;

    const durationUnits = (2.5 * ((gaugesReaction - 0.04) * 1.25 + 1) + 7) / elementalStatus.parsedDecay;
    const clone = elementalStatus.clone;
    clone.duration = `${durationUnits}${elementalStatus.parsedDecay}`;
    clone.currentFrame = 0;

    return clone;
  }

  applyBonusDamage(args: IElementalReactionArgs): number {
    const {enemies} = this.roster;
    const anemoStaus = args.elementalStatus!!;

    for (let entity1 of enemies) {
      const entity1Status = this.getEntityStatus(entity1);

      if (entity1Status) {
        for (let entity2 of enemies) {
          const entity2Status = this.getEntityStatus(entity1);

          if (entity2Status) {
            this.elementalReactionManager.applyReaction({
              ...args,
              entity: entity1,
              elementalStatus: this.calcSwirledElement(entity2Status, anemoStaus),
            });
          }
        }
      }
    }

    return this.baseMultiplier
      * this.calcLvlMultiplier(args.character)
      * (1 + (args.character.calculatorStats.elementalMastery.transformativeReactionBonus) / 100)
  }
}
