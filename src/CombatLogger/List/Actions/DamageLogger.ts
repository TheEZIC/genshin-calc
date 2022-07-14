import LoggerItem, {ILogItem} from "@/CombatLogger/LoggerItem";
import { LoggerItemType } from "@/CombatLogger/LoggerItemType";
import {IOnSkillDamage} from "@/Roster/GlobalListeners";
import {ICombatDamageArgs} from "@/Skills/CombatActions";
import {ITitle} from "@/ITitle";

export interface IDamageLoggerItem extends ILogItem {
  comment: string;
  characterName: string;
  sourceName: string;
  elementalStatus?: string;
}

export default class DamageLogger extends LoggerItem<IDamageLoggerItem, ICombatDamageArgs> {
  type: LoggerItemType = LoggerItemType.DoDamage;

  public onLog(args: ICombatDamageArgs): IDamageLoggerItem {
    const startFrame = args.character.damageCalculator.currentFrame;
    const {source, character, value, comment = "", elementalStatus} = args;
    let src = source as ITitle;

    return {
      message: `${src.title} do ${value} damage`,
      startFrame,
      comment,
      elementalStatus: `${elementalStatus?.name} ${elementalStatus?.units}U`,
      sourceName: src.title,
      characterName: character.title,
    };
  }
}
