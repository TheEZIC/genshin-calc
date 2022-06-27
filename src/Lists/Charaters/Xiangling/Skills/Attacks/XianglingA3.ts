import SkillValue from "@/Skills/SkillValue";
import XianglingNormalAttackStage from "@/Lists/Charaters/Xiangling/Skills/Attacks/XianglingNormalAttackStage";

export default class XianglingA3 extends XianglingNormalAttackStage {
  public skillName: string = "Dough-Fu A3";

  public override hits: number = 2;

  public frames: number = 12;
  public value: SkillValue = new SkillValue(26.06 * this.hits, 28.18 * this.hits, 33.33 * this.hits);
}
