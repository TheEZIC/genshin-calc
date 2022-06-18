import SkillValue from "@/Skills/SkillValue";
import AyakaNormalAttackStage from "./AyakaNormalAttackStage";

export default class AyakaA1 extends AyakaNormalAttackStage {
  public skillName: string = "Kamisato Art: Kabuki A1";

  public frames: number = 8;
  public value: SkillValue = new SkillValue(45.73, 49.45, 58.49);
}
