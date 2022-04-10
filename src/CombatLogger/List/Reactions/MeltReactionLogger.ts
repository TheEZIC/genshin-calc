import ReactionLogger from "@/CombatLogger/Abstracts/ReactionLogger";
import {LoggerItemType} from "@/CombatLogger/LoggerItemType";

export default class MeltReactionLogger extends ReactionLogger {
  type: LoggerItemType = LoggerItemType.MeltReaction;
}
