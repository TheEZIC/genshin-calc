import XianglingNormalAttackStage from "@/Lists/Charaters/Xiangling/Skills/Attacks/XianglingNormalAttackStage";
import SkillValue from "@/Skills/SkillValue";

export default class XianglingA1 extends XianglingNormalAttackStage {
  public skillName: string = "Dough-Fu A1";

  public frames: number = 12;
  public value: SkillValue = new SkillValue(42.05, 45.48, 53.79);
}
