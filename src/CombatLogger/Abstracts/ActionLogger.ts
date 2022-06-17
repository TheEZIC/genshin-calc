import LoggerItem, {ILogItem} from "@/CombatLogger/LoggerItem";
import {IOnSkillAction} from "@/Roster/GlobalListeners";

export interface IActionLoggerItem extends ILogItem {
  comment: string;
  skillName: string;
  characterName: string;
}

export default abstract class ActionLogger extends LoggerItem<IActionLoggerItem, IOnSkillAction> {
  protected abstract messageEvent: string;

  public onLog(args: IOnSkillAction): IActionLoggerItem {
    const startFrame = this.combatLogger.damageCalculator.currentFrame;
    const {skill, character, value, comment} = args;

    return {
      message: `Skill ${skill.title} do ${value} ${this.messageEvent}`,
      ignoreLog: skill.ignoreLog,
      startFrame,
      comment,
      characterName: character.title,
      skillName: skill.title,
    };
  }
}
