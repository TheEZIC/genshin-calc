import ElementalReaction from "@/ElementalReactions/ElementalReaction";
import Character from "@/Entities/Characters/Character";
import Skill from "@/Skills/Skill";

export default class CrystallizeReaction extends ElementalReaction {
  applyBonusDamage(character: Character, skill: Skill, damage: number): number {
    return damage / character.calculatorStats.critChance.critEffect;
  }
}
