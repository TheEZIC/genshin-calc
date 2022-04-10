import LoggerItem, {ILogItem} from "@/CombatLogger/LoggerItem";
import {ProxyEvent} from "@/Helpers/Listener";
import {IOnReactionArgs} from "@/ElementalReactions/ElementalReaction";

export interface IReactionLoggerItem extends ILogItem {
  name: string;
  damage: number;
}

export default abstract class ReactionLogger extends LoggerItem<IReactionLoggerItem, ProxyEvent<IOnReactionArgs>> {
  public onLog(args: ProxyEvent<IOnReactionArgs>): IReactionLoggerItem {
    const {startFrame} = args;
    const {reaction, damage} = args.args;

    return {
      message: `${reaction.name} reacted`,
      startFrame,
      name: reaction.name,
      damage,
    };
  }
}
