import ElementalReaction from "@/ElementalReactions/ElementalReaction";
import Character from "@/Entities/Characters/Character";

export default class CrystallizeReaction extends ElementalReaction {
  applyBonusDamage(character: Character, damage: number): number {
    return damage / character.calculatorStats.critChance.critEffect;
  }
}
