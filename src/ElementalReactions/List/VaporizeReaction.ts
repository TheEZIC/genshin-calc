import MultipliedElementalReaction from "@/ElementalReactions/MultipliedElementalReaction";
import Character from "@/Entities/Characters/Character";
import Roster from "@/Roster/Roster";
import {container} from "tsyringe";
import DamageCalculator from "@/Roster/DamageCalculator";

export default class VaporizeReaction extends MultipliedElementalReaction {
  public multiplier: number = 1.5;

  applyBonusDamage(character: Character, damage: number): number {
    const roster = container.resolve(Roster);
    const damageCalculator = container.resolve(DamageCalculator);

    const {entities} = roster;
    const {elementalReactionManager} = damageCalculator;

    return damage * (this.multiplier + character.calculatorStats.elementalMastery.vaporizeAndMeltReactionBonus);
  }
}
