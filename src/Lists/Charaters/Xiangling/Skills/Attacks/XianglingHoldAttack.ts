import HoldAttackSkill from "@/Skills/Defaults/HoldAttackSkill";
import SkillValue from "@/Skills/SkillValue";
import SkillArgs from "@/Skills/Args/SkillArgs";
import {SkillType} from "@/Skills/SkillType";
import NormalAttackSkill from "@/Skills/Defaults/NormalAttackSkill";
import Skill from "@/Skills/Skill";
import XianglingA1 from "@/Lists/Charaters/Xiangling/Skills/Attacks/XianglingA1";

export default class XianglingHoldAttack extends HoldAttackSkill {
  public frames: number = 90;
  public skillName: string = "Hold Attack: Dough-Fu";

  protected value: SkillValue = new SkillValue(121.69, 131.6, 155.65);

  protected override onAwake(args: SkillArgs) {
    super.onAwake(args);

    const {character} = args;
    let attackSkill = character
      .skillManager
      .getSkillByType(SkillType.NormalAttack)!
      .clone as NormalAttackSkill;

    const history = args.damageCalculator.skillHistory
    let prevSkill: Skill | undefined = history[history.length - 1]?.skill;

    //if prev skill is not A1 then run it
    if (!prevSkill || !(prevSkill instanceof XianglingA1)) {
      args.damageCalculator.runAnotherSkill(attackSkill.getAttackStageAt(0), args);
    }
  }
}
