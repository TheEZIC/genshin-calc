import AyakaNormalAttackStage from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaNormalAttackStage";
import SkillValue from "@/Skills/SkillValue";

export default class XianglingA5 extends AyakaNormalAttackStage {
  public skillName: string = "Dough-Fu A1";

  public frames: number = 167;
  public value: SkillValue = new SkillValue(71.04, 76.82 - 71.04);
}
