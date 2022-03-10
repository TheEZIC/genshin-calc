import ElementalReaction, {IElementalReactionArgs} from "@/ElementalReactions/ElementalReaction";

export default class FrozenReaction extends ElementalReaction {
  public triggerMultiplier: number = 1.25;

  public applyBonusDamage(args: IElementalReactionArgs): number {
    return 0;
  }
}
