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

  applyBonusDamage(args: IElementalReactionArgs): number {
    const {entities} = this.roster;

    for (let entity1 of entities) {
      const entity1Status = this.getEntityStatus(entity1);

      if (entity1Status) {
        for (let entity2 of entities) {
          const entity2Status = this.getEntityStatus(entity1);

          if (entity2Status) {
            this.elementalReactionManager.applyReaction({
              ...args,
              entity: entity1,
              elementalStatus: entity2Status,
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
