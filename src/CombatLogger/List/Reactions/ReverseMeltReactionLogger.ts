import ReactionLogger from "@/CombatLogger/Abstracts/ReactionLogger";
import {LoggerItemType} from "@/CombatLogger/LoggerItemType";

export default class ReverseMeltReactionLogger extends ReactionLogger {
  type: LoggerItemType = LoggerItemType.ReverseMeltReaction;
}
