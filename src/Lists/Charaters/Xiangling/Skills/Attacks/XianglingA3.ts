import AyakaNormalAttackStage from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaNormalAttackStage";
import SkillValue from "@/Skills/SkillValue";

export default class XianglingA3 extends AyakaNormalAttackStage {
  public skillName: string = "Dough-Fu A3";

  public override hits: number = 2;

  public frames: number = 12;
  public value: SkillValue = new SkillValue(26.06 * this.hits, 28.18 * this.hits, 33.33 * this.hits);
}
