import ElementalReaction from "@/ElementalReactions/ElementalReaction";

export default abstract class MultipliedElementalReaction extends ElementalReaction {
  protected abstract damageMultiplier: number;
}
