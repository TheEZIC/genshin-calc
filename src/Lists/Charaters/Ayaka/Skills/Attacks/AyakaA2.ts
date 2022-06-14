import SkillValue from "@/Skills/SkillValue";
import AyakaNormalAttackStage from "./AyakaNormalAttackStage";

export default class AyakaA2 extends AyakaNormalAttackStage {
  public skillName: string = "Kamisato Art: Kabuki A2";

  public frames: number = 28;
  public value: SkillValue = new SkillValue(48.68, 3.97);
}
