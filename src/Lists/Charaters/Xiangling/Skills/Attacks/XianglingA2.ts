import XianglingNormalAttackStage from "@/Lists/Charaters/Xiangling/Skills/Attacks/XianglingNormalAttackStage";
import SkillValue from "@/Skills/SkillValue";

export default class XianglingA2 extends XianglingNormalAttackStage {
  public skillName: string = "Dough-Fu A2";

  public frames: number = 38;
  public value: SkillValue = new SkillValue(42.14, 45.57, 53.9);
}
