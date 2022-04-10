import ReactionLogger from "@/CombatLogger/Abstracts/ReactionLogger";
import {LoggerItemType} from "@/CombatLogger/LoggerItemType";

export default class CrystallizeReactionLogger extends ReactionLogger {
  type: LoggerItemType = LoggerItemType.CrystallizeReaction;
}
