import NoelleNormalAttackStage from "@/Lists/Charaters/Noelle/Skills/Attacks/NoelleNormalAttackStage";
import SkillValue from "@/Skills/SkillValue";

export default class NoelleA2 extends NoelleNormalAttackStage {
  public skillName: string = "Favonius Bladework - Maid A2";

  public frames: number = 70;
  protected value: SkillValue = new SkillValue(73.36, 79.33, 93.83);
}
