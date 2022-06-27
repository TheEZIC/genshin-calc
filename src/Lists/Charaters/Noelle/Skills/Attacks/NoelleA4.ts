import NoelleNormalAttackStage from "@/Lists/Charaters/Noelle/Skills/Attacks/NoelleNormalAttackStage";
import SkillValue from "@/Skills/SkillValue";

export default class NoelleA4 extends NoelleNormalAttackStage {
  public skillName: string = "Favonius Bladework - Maid A4";

  public frames: number = 174;
  protected value: SkillValue = new SkillValue(113.43, 122.67, 145.09);
}
