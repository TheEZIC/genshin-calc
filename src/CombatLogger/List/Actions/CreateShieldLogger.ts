import {LoggerItemType} from "@/CombatLogger/LoggerItemType";
import {ICombatHealArgs, ICombatShieldArgs} from "@/Skills/CombatActions";
import LoggerItem, {ILogItem} from "@/CombatLogger/LoggerItem";
import {ITitle} from "@/ITitle";

export interface IShieldLoggerItem extends ILogItem {
  comment: string;
  sourceName: string;
  characterName: string;
}

export default class CreateShieldLogger extends LoggerItem<IShieldLoggerItem, ICombatShieldArgs> {
  public type: LoggerItemType = LoggerItemType.CreateShield;

  onLog(args: ICombatHealArgs): IShieldLoggerItem {
    const startFrame = args.character.damageCalculator.currentFrame;
    const {source, character, value, comment = ""} = args;
    let src = source as ITitle;

    return {
      message: `${src.title} create ${value} shield`,
      startFrame,
      comment,
      sourceName: src.title,
      characterName: character.title,
    };
  }
}
