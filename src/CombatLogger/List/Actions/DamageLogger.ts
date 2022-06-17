import LoggerItem, {ILogItem} from "@/CombatLogger/LoggerItem";
import { LoggerItemType } from "@/CombatLogger/LoggerItemType";
import {IOnSkillDamage} from "@/Roster/GlobalListeners";

export interface IDamageLoggerItem extends ILogItem {
  comment: string;
  skillName: string;
  characterName: string;
  elementalStatus?: string;
}

export default class DamageLogger extends LoggerItem<IDamageLoggerItem, IOnSkillDamage> {
  type: LoggerItemType = LoggerItemType.DoDamage;

  public onLog(args: IOnSkillDamage): IDamageLoggerItem {
    const startFrame = args.character.damageCalculator.currentFrame;
    const {skill, character, value, comment, elementalStatus} = args;

    return {
      message: `Skill ${skill.title} do ${value} damage`,
      startFrame,
      comment,
      elementalStatus: `${elementalStatus?.name} ${elementalStatus?.units}U`,
      characterName: character.title,
      skillName: skill.title,
    };
  }
}
