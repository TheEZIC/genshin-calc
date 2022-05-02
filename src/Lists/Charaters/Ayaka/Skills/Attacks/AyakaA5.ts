import AyakaNormalAttack from "./AyakaNormalAttack";
import SkillValue from "@/Skills/SkillValue";

export default class AyakaA5 extends AyakaNormalAttack {
  public skillName: string = "Kamisato Art: Kabuki A5";

  public frames: number = 136;
  public value: SkillValue = new SkillValue(78.18, 6.37);
}
