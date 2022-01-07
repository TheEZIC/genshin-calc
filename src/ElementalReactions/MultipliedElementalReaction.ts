import ElementalReaction from "@/ElementalReactions/ElementalReaction";

export default abstract class MultipliedElementalReaction extends ElementalReaction {
  public abstract multiplier: number;
}
