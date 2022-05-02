import SkillValue from "@/Skills/SkillValue";
import AyakaNormalAttack from "./AyakaNormalAttack";

export default class AyakaA3 extends AyakaNormalAttack {
  public skillName: string = "Kamisato Art: Kabuki A3";

  public frames: number = 56;
  public value: SkillValue = new SkillValue(62.62, 5.1);
}
