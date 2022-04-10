import EffectLogger from "@/CombatLogger/Abstracts/EffectLogger";
import {LoggerItemType} from "@/CombatLogger/LoggerItemType";

export default class EffectStartedLogger extends EffectLogger {
  protected messageEvent: string = "started";
  public type: LoggerItemType = LoggerItemType.EffectStarted;
}
