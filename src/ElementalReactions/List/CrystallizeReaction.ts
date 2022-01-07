import ElementalReaction from "@/ElementalReactions/ElementalReaction";
import Character from "@/Characters/Character";

export default class CrystallizeReaction extends ElementalReaction {
  calcBonusDamage(character: Character, damage: number): number {
    return damage / character.calculatorStats.critChance.critEffect;
  }
}
