import AyakaNormalAttackStage from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaNormalAttackStage";
import SkillValue from "@/Skills/SkillValue";

export default class XianglingA2 extends AyakaNormalAttackStage {
  public skillName: string = "Dough-Fu A2";

  public frames: number = 38;
  public value: SkillValue = new SkillValue(42.14, 45.57 - 42.14);
}
