import Skill from "@/Skills/Skill";
import {ISkillStrategy} from "@/Skills/SkillStrategy";
import NormalAttackSkillStrategy from "@/Skills/SkillStrategy/NormalAttackSkillStrategy";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import {SkillTargetType} from "@/Skills/SkillTargetType";
import SkillArgs from "@/Skills/Args/SkillArgs";
import NormalAttackSkillStage from "@/Skills/NormalAttackSkillStage";

export default abstract class NormalAttackSkill extends Skill {
  public strategy: ISkillStrategy = new NormalAttackSkillStrategy(this);
  public override ignoreLog: boolean = true;

  //never mind
  public countdownFrames: number = 0;

  //never mind
  public frames: number = 0;

  //never mind
  public damageRegistrationType: SkillDamageRegistrationType = SkillDamageRegistrationType.Adaptive;

  //never mind
  public targetType: SkillTargetType = SkillTargetType.Single;

  public abstract attackStages: Skill[];

  override onAction(args: SkillArgs) {
  }

  public getCurrentAttackSkillIndex(args: SkillArgs): number {
    const {prevSkill, damageCalculator} = args;
    const prevSkills = damageCalculator.skillHistory;

    if (!prevSkill || !prevSkills.length) {
      return 0;
    }

    let index = prevSkills.length - 1;
    let attackSkillsCount = 0;

    let skill = prevSkills[index].skill;

    while (index >= 0 && skill instanceof NormalAttackSkillStage) {
      attackSkillsCount++;
      index--;
      skill = prevSkills[index]?.skill;
    }

    const fullRotations = Math.trunc(attackSkillsCount / this.attackStages.length);

    return attackSkillsCount - (fullRotations * this.attackStages.length);
  }

  private getAttackSkill(args: SkillArgs): Skill {
    const currentAttackIndex = this.getCurrentAttackSkillIndex(args);
    const attackSkill = this.attackStages[currentAttackIndex].clone;

    return attackSkill;
  }

  public override onStart(args: SkillArgs) {
    const skill = this.getAttackSkill(args);
    skill.lvl.current = this.lvl.current;
    args.damageCalculator.runAnotherSkill(skill, args);
  }
}
