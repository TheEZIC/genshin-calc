import ElementalReaction from "@/ElementalReactions/ElementalReaction";
import Character from "@/Entities/Characters/Character";

export default abstract class TransformativeElementalReaction extends ElementalReaction {
  protected abstract baseMultiplier: number;

  protected calcLvlMultiplier(character: Character): number {
    const {lvl} = character.baseStats;

    if (lvl > 0 && lvl < 60) {
      return 0.0002325 * lvl ** 3 + 0.05547 * lvl ** 2 - 0.2523 * lvl + 14.47;
    } else if (lvl >= 60) {
      return 0.00194 * lvl ** 3 - 0.319 * lvl ** 2 + 30.7 * lvl - 868;
    }

    return 0;
  }
}
