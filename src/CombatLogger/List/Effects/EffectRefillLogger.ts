import EffectLogger from "@/CombatLogger/Abstracts/EffectLogger";
import {LoggerItemType} from "@/CombatLogger/LoggerItemType";

export default class EffectRefillLogger extends EffectLogger {
  protected messageEvent: string = "refill";
  public type: LoggerItemType = LoggerItemType.EffectRefill;
}
