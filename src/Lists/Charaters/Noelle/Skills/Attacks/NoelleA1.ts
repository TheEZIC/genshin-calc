import NoelleNormalAttackStage from "@/Lists/Charaters/Noelle/Skills/Attacks/NoelleNormalAttackStage";
import SkillValue from "@/Skills/SkillValue";

export default class NoelleA1 extends NoelleNormalAttackStage {
  public skillName: string = "Favonius Bladework - Maid A1";

  public frames: number = 28;
  protected value: SkillValue = new SkillValue(79.12, 85.56, 101.2);
}
