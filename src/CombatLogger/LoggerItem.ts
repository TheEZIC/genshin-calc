import CombatLogger from "@/CombatLogger/CombatLogger";

export interface ILogItem {
  message: string;
  startFrame: number;
}

export interface IEndingLogItem extends ILogItem {
  type: LoggerItemType;
  endFrame: number;
  durationFrame: number;
}

export enum LoggerItemType {
  SkillStarted,
  SkillEnded,
  EffectStarted,
  EffectReactivate,
  EffectEnded,
  DoDamage,
  DoHeal,
  CreateShield,
}

interface IDefaultLogArgs {
  message: string;
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
    this.combatLogger.addLog(this.onLog(args));
  }
}
