import AyakaNormalAttack from "./AyakaNormalAttack";
import SkillValue from "@/Skills/SkillValue";
import SkillsManager from "@/Skills/SkillsManager";

export default class AyakaA4 extends AyakaNormalAttack {
  frames: number = 98;
  value: SkillValue = new SkillValue(22.65 * 3, 1.84 * 3);
}
