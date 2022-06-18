import AyakaNormalAttackStage from "./AyakaNormalAttackStage";
import SkillValue from "@/Skills/SkillValue";

export default class AyakaA5 extends AyakaNormalAttackStage {
  public skillName: string = "Kamisato Art: Kabuki A5";

  public frames: number = 136;
  public value: SkillValue = new SkillValue(78.18, 84.55, 100);
}
