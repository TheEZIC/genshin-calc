import ActionLogger from "@/CombatLogger/Abstracts/ActionLogger";
import {LoggerItemType} from "@/CombatLogger/LoggerItemType";

export default class HealLogger extends ActionLogger {
  protected messageEvent: string = "heal";
  public type: LoggerItemType = LoggerItemType.DoHeal;
}
