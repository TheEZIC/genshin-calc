import ActionLogger from "@/CombatLogger/Abstracts/ActionLogger";
import {LoggerItemType} from "@/CombatLogger/LoggerItem";

export default class DamageLogger extends ActionLogger {
  protected messageEvent: string = "damage";
  public type: LoggerItemType = LoggerItemType.DoDamage;
}
