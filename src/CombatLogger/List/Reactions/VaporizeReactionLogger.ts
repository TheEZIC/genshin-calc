import ReactionLogger from "@/CombatLogger/Abstracts/ReactionLogger";
import {LoggerItemType} from "@/CombatLogger/LoggerItemType";

export default class VaporizeReactionLogger extends ReactionLogger {
  type: LoggerItemType = LoggerItemType.VaporizeReaction;
}
