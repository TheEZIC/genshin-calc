import ActionLogger from "@/CombatLogger/Abstracts/ActionLogger";
import {LoggerItemType} from "@/CombatLogger/LoggerItem";

export default class CreateShieldLogger extends ActionLogger {
  protected messageEvent: string = "shield durability";
  public type: LoggerItemType = LoggerItemType.CreateShield;
}
