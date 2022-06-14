import SkillValue from "@/Skills/SkillValue";
import AyakaNormalAttackStage from "./AyakaNormalAttackStage";

export default class AyakaA3 extends AyakaNormalAttackStage {
  public skillName: string = "Kamisato Art: Kabuki A3";

  public frames: number = 56;
  public value: SkillValue = new SkillValue(62.62, 5.1);
}
