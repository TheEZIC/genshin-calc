import LoggerItem, {ILogItem} from "@/CombatLogger/LoggerItem";
import {ProxyEvent} from "@/Helpers/Listener";
import {IOnAnySkill} from "@/Roster/GlobalListeners";

export interface ISkillBehaviorLoggerItem extends ILogItem {
  skillName: string;
  characterName: string;
}

export default abstract class SkillBehaviorLogger extends LoggerItem<ISkillBehaviorLoggerItem, ProxyEvent<IOnAnySkill>> {
  protected abstract messageEvent: string;

  public onLog(args: ProxyEvent<IOnAnySkill>): ISkillBehaviorLoggerItem {
    const {startFrame} = args;
    const {skill, character} = args.args;

    return {
      message: `Skill ${skill.title} ${this.messageEvent}`,
      startFrame,
      characterName: character.title,
      skillName: skill.title
    };
  }
}
