import ReactionLogger from "@/CombatLogger/Abstracts/ReactionLogger";
import {LoggerItemType} from "@/CombatLogger/LoggerItemType";

export default class ElectroChargedReactionLogger extends ReactionLogger {
  type: LoggerItemType = LoggerItemType.ElectroChargedReaction;
}
