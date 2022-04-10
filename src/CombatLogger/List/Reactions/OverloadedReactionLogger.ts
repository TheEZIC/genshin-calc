import ReactionLogger from "@/CombatLogger/Abstracts/ReactionLogger";
import {LoggerItemType} from "@/CombatLogger/LoggerItemType";

export default class OverloadedReactionLogger extends ReactionLogger {
  type: LoggerItemType = LoggerItemType.OverloadedReaction;
}
