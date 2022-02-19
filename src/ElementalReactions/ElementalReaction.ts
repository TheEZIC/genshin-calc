import Character from "@/Entities/Characters/Character";

export default abstract class ElementalReaction {
  abstract applyBonusDamage(character: Character, damage: number): number;
}
