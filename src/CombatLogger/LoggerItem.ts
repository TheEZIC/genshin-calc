import CombatLogger from "@/CombatLogger/CombatLogger";
import {LoggerItemType} from "@/CombatLogger/LoggerItemType";

export interface ILogItem {
  message: string;
  startFrame: number;
  ignoreLog?: boolean;
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
    const logResult = this.onLog(args);

    if (!logResult.ignoreLog) {
      this.combatLogger.addLog(logResult, this.type);
    }
  }
}
