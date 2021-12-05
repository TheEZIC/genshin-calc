import SkillValue from "@/Skills/SkillValue";

import AyakaNormalAttack from "./AyakaNormalAttack";
import SkillsManager from "@/Skills/SkillsManager";

export default class AyakaA2 extends AyakaNormalAttack {
  frames: number = 28;
  value: SkillValue = new SkillValue(48.68, 3.97);
}
