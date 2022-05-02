import SkillValue from "@/Skills/SkillValue";
import AyakaNormalAttack from "./AyakaNormalAttack";

export default class AyakaA1 extends AyakaNormalAttack {
  public skillName: string = "Kamisato Art: Kabuki A1";

  public frames: number = 8;
  public value: SkillValue = new SkillValue(45.73, 3.72);
}
