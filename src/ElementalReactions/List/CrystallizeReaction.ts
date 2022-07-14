import ElementalReaction, {
  IElementalReactionArgs,
  IElementalReactionManagerArgs
} from "@/ElementalReactions/ElementalReaction";

export default class CrystallizeReaction extends ElementalReaction {
  public triggerMultiplier: number = 0.625;

  public applyBonusDamage(args: IElementalReactionArgs): number {
    return 0;
  }
}
