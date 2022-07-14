import ElementalReaction from "@/ElementalReactions/ElementalReaction";

export default abstract class AmplifyingElementalReaction extends ElementalReaction {
  protected abstract damageMultiplier: number;

  protected override getDamage(damage: number, bonusDamage: number): number {
    return bonusDamage - damage;
  }
}
