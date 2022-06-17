import LoggerItem, {ILogItem} from "@/CombatLogger/LoggerItem";
import {IOnAnyEffect} from "@/Roster/GlobalListeners";

export interface IEffectLoggerItem extends ILogItem {
  effectName: string;
}

export default abstract class EffectLogger extends LoggerItem<IEffectLoggerItem, IOnAnyEffect> {
  protected abstract messageEvent: string;

  public onLog(args: IOnAnyEffect): IEffectLoggerItem {
    const startFrame = args.entity.damageCalculator.currentFrame;
    const {effect} = args;

    return {
      message: `Effect ${effect.name} ${this.messageEvent}`,
      startFrame,
      effectName: effect.name,
    };
  }
}
