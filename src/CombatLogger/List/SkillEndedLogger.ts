import SkillBehaviorLogger from "@/CombatLogger/Abstracts/SkillBehaviorLogger";
import { LoggerItemType } from "../LoggerItemType";

export default class SkillEndedLogger extends SkillBehaviorLogger {
  protected messageEvent: string = "ended";
  public type: LoggerItemType = LoggerItemType.SkillEnded;
}
