import LoggerItem, {ILogItem} from "@/CombatLogger/LoggerItem";
import {ProxyEvent} from "@/Helpers/Listener";
import {IOnAnyEffect} from "@/Roster/GlobalListeners";

export interface IEffectLoggerItem extends ILogItem {
  effectName: string;
}

export default abstract class EffectLogger extends LoggerItem<IEffectLoggerItem, ProxyEvent<IOnAnyEffect>> {
  protected abstract messageEvent: string;

  public onLog(args: ProxyEvent<IOnAnyEffect>): IEffectLoggerItem {
    const {startFrame} = args;
    const {effect} = args.args;

    return {
      message: `Effect ${effect.name} ${this.messageEvent}`,
      startFrame,
      effectName: effect.name,
    };
  }
}
