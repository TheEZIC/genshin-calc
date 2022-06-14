import LoggerItem, {ILogItem} from "@/CombatLogger/LoggerItem";
import {ProxyEvent} from "@/Helpers/Listener";
import {IOnSkillAction} from "@/Roster/GlobalListeners";

export interface IActionLoggerItem extends ILogItem {
  comment: string;
  skillName: string;
  characterName: string;
}

export default abstract class ActionLogger extends LoggerItem<IActionLoggerItem, ProxyEvent<IOnSkillAction>> {
  protected abstract messageEvent: string;

  public onLog(args: ProxyEvent<IOnSkillAction>): IActionLoggerItem {
    const {startFrame} = args;
    const {skill, character, value, comment} = args.args;

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
