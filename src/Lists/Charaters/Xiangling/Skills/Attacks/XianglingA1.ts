import AyakaNormalAttackStage from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaNormalAttackStage";
import SkillValue from "@/Skills/SkillValue";

export default class XianglingA1 extends AyakaNormalAttackStage {
  public skillName: string = "Dough-Fu A1";

  public frames: number = 12;
  public value: SkillValue = new SkillValue(42.05, 45.48 - 42.05);
}
