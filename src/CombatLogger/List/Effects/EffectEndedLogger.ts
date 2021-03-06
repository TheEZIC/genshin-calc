import EffectLogger from "@/CombatLogger/Abstracts/EffectLogger";
import {LoggerItemType} from "@/CombatLogger/LoggerItemType";

export default class EffectEndedLogger extends EffectLogger {
  protected messageEvent: string = "ended";
  public type: LoggerItemType = LoggerItemType.EffectEnded;
}
