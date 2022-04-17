import LoggerItem, {ILogItem} from "@/CombatLogger/LoggerItem";
import { LoggerItemType } from "@/CombatLogger/LoggerItemType";
import {ProxyEvent} from "@/Helpers/Listener";
import {IOnSkillDamage} from "@/Roster/GlobalListeners";

export interface IDamageLoggerItem extends ILogItem {
  comment: string;
  skillName: string;
  characterName: string;
  elementalStatus?: string;
}

export default class DamageLogger extends LoggerItem<IDamageLoggerItem, ProxyEvent<IOnSkillDamage>> {
  type: LoggerItemType = LoggerItemType.DoDamage;

  public onLog(args: ProxyEvent<IOnSkillDamage>): IDamageLoggerItem {
    const {startFrame} = args;
    const {skill, character, value, comment, elementalStatus} = args.args;

    return {
      message: `Skill ${skill.name} do ${value} damage`,
      startFrame,
      comment,
      elementalStatus: `${elementalStatus?.name} ${elementalStatus?.units}U`,
      characterName: character.name,
      skillName: skill.name,
    };
  }
}
