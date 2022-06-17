import LoggerItem, {ILogItem} from "@/CombatLogger/LoggerItem";
import {IOnReactionArgs} from "@/ElementalReactions/ElementalReaction";

export interface IReactionLoggerItem extends ILogItem {
  name: string;
  damage: number;
}

export default abstract class ReactionLogger extends LoggerItem<IReactionLoggerItem, IOnReactionArgs> {
  public onLog(args: IOnReactionArgs): IReactionLoggerItem {
    const startFrame = args.character.damageCalculator.currentFrame;
    const {reaction, damage} = args;

    return {
      message: `${reaction.name} reacted`,
      startFrame,
      name: reaction.name,
      damage,
    };
  }
}
