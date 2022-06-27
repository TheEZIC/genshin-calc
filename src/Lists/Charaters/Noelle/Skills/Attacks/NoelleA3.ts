import NoelleNormalAttackStage from "@/Lists/Charaters/Noelle/Skills/Attacks/NoelleNormalAttackStage";
import SkillValue from "@/Skills/SkillValue";

export default class NoelleA3 extends NoelleNormalAttackStage {
  public skillName: string = "Favonius Bladework - Maid A3";

  public frames: number = 116;
  protected value: SkillValue = new SkillValue(86.26, 93.28, 110.33);
}
