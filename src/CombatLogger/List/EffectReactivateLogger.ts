import EffectLogger from "@/CombatLogger/Abstracts/EffectLogger";
import {LoggerItemType} from "@/CombatLogger/LoggerItemType";

export default class EffectReactivateLogger extends EffectLogger {
  protected messageEvent: string = "reactivate";
  public type: LoggerItemType = LoggerItemType.EffectReactivate;
}
