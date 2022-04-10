import CombatLogger from "@/CombatLogger/CombatLogger";
import {LoggerItemType} from "@/CombatLogger/LoggerItemType";

export interface ILogItem {
  message: string;
  startFrame: number;
}

export interface IEndingLogItem extends ILogItem {
  type: LoggerItemType;
  endFrame: number;
  durationFrame: number;
}

export default abstract class LoggerItem<T extends ILogItem, LogArgs> {
  constructor(
    private combatLogger: CombatLogger,
  ) {
  }

  public abstract type: LoggerItemType;

  public is(obj: any): obj is T {
    return obj.type && obj.type === this.type;
  };

  public abstract onLog(args: LogArgs): T;

  public log(args: LogArgs): void {
    this.combatLogger.addLog(this.onLog(args), this.type);
  }
}
