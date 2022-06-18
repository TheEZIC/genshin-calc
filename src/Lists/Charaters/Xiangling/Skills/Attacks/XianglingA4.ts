import AyakaNormalAttackStage from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaNormalAttackStage";
import SkillValue from "@/Skills/SkillValue";

export default class XianglingA4 extends AyakaNormalAttackStage {
  public skillName: string = "Dough-Fu A4";

  public override hits: number = 4;

  public frames: number = 141;
  public value: SkillValue = new SkillValue(14.1 * this.hits, 15.25 * this.hits, 18.04 * this.hits);
}
