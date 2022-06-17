import LoggerItem, {ILogItem} from "@/CombatLogger/LoggerItem";
import {ProxyEvent} from "@/Helpers/Listener";
import SkillArgs from "@/Skills/Args/SkillArgs";

export interface ISkillBehaviorLoggerItem extends ILogItem {
  skillName: string;
  characterName: string;
}

export default abstract class SkillBehaviorLogger extends LoggerItem<ISkillBehaviorLoggerItem, SkillArgs> {
  protected abstract messageEvent: string;

  public onLog(args: SkillArgs): ISkillBehaviorLoggerItem {
    const startFrame = args.damageCalculator.currentFrame;
    const {skill, character} = args;

    return {
      message: `Skill ${skill.title} ${this.messageEvent}`,
      ignoreLog: skill.ignoreLog,
      startFrame,
      characterName: character.title,
      skillName: skill.title
    };
  }
}
