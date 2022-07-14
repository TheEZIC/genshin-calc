import {LoggerItemType} from "@/CombatLogger/LoggerItemType";
import LoggerItem, {ILogItem} from "@/CombatLogger/LoggerItem";
import {ICombatHealArgs} from "@/Skills/CombatActions";
import {ITitle} from "@/ITitle";

export interface IHealLoggerItem extends ILogItem {
  comment: string;
  sourceName: string;
  characterName: string;
}

export default class HealLogger extends LoggerItem<IHealLoggerItem, ICombatHealArgs> {
  public type: LoggerItemType = LoggerItemType.DoHeal;

  onLog(args: ICombatHealArgs): IHealLoggerItem {
    const startFrame = args.character.damageCalculator.currentFrame;
    let {source, character, value, comment = ""} = args;
    let src = source as ITitle;

    return {
      message: `${src.title} do ${value} heal`,
      startFrame,
      comment,
      characterName: character.title,
      sourceName: src.title,
    };
  }
}
