import ReactionLogger from "@/CombatLogger/Abstracts/ReactionLogger";
import {LoggerItemType} from "@/CombatLogger/LoggerItemType";

export default class SuperConductReactionLogger extends ReactionLogger {
  type: LoggerItemType = LoggerItemType.SuperConductReaction;
}
