import Character from "@/Characters/Character";

export default abstract class ElementalReaction {
  abstract calcBonusDamage(character: Character, damage: number): number;
}
