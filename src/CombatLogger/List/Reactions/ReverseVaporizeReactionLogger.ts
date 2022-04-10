import ReactionLogger from "@/CombatLogger/Abstracts/ReactionLogger";
import {LoggerItemType} from "@/CombatLogger/LoggerItemType";

export default class ReverseVaporizeReactionLogger extends ReactionLogger {
  type: LoggerItemType = LoggerItemType.ReverseVaporizeReaction;
}
