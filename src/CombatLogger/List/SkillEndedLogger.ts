import SkillBehaviorLogger from "@/CombatLogger/Abstracts/SkillBehaviorLogger";
import {LoggerItemType} from "@/CombatLogger/LoggerItem";

export default class SkillEndedLogger extends SkillBehaviorLogger {
  protected messageEvent: string = "ended";
  public type: LoggerItemType = LoggerItemType.SkillEnded;
}
