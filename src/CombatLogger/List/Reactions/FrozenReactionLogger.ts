import ReactionLogger from "@/CombatLogger/Abstracts/ReactionLogger";
import {LoggerItemType} from "@/CombatLogger/LoggerItemType";

export default class FrozenReactionLogger extends ReactionLogger {
  type: LoggerItemType = LoggerItemType.FrozenReaction;
}
