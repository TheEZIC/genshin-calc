import ElementalReaction from "@/ElementalReactions/ElementalReaction";
import Character from "@/Entities/Characters/Character";
import Skill from "@/Skills/Skill";
import ElementalStatus from "@/ElementalStatuses/ElementalStatus";
import {container} from "@/inversify.config";
import Roster from "@/Roster/Roster";

export default class SwirlReaction extends ElementalReaction {
  private isAnyEntityHasElementalStatus(): boolean {
    const roster: Roster = container.get("Roster");
    const anyEntityHasStatus: boolean = Boolean(
      roster.entities.filter(entity => entity.ongoingEffects.find(e => e instanceof ElementalStatus)).length
    );

    return anyEntityHasStatus;

    return true;
  }

  applyBonusDamage(character: Character, skill: Skill, damage: number): number {
    //const {entities} = this.roster!!;
    let hasStatus = this.isAnyEntityHasElementalStatus();

    // while(hasStatus) {
    //   for (let entity of entities) {
    //     damage += elementalReactionManager.applyReaction(character, entity, skill, damage);
    //   }
    //
    //   hasStatus = this.isAnyEntityHasElementalStatus();
    // }

    return damage
      / character.calculatorStats.critChance.critEffect
      * character.calculatorStats.elementalMastery.anemoAndElectroReactionBonus;
  }
}
