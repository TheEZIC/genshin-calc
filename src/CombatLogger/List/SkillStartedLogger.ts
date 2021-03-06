import SkillBehaviorLogger from "@/CombatLogger/Abstracts/SkillBehaviorLogger";
import {LoggerItemType} from "@/CombatLogger/LoggerItemType";

export default class SkillStartedLogger extends SkillBehaviorLogger {
  protected messageEvent: string = "started";
  public type: LoggerItemType = LoggerItemType.SkillStarted;
}
