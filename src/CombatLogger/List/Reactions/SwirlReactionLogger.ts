import ReactionLogger from "@/CombatLogger/Abstracts/ReactionLogger";
import {LoggerItemType} from "@/CombatLogger/LoggerItemType";

export default class SwirlReactionLogger extends ReactionLogger {
  type: LoggerItemType = LoggerItemType.SwirlReaction;
}
