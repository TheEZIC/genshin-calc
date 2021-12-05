import SkillValue from "@/Skills/SkillValue";

import AyakaNormalAttack from "./AyakaNormalAttack";
import SkillsManager from "@/Skills/SkillsManager";

export default class AyakaA1 extends AyakaNormalAttack {
  frames: number = 8;
  value: SkillValue = new SkillValue(45.73, 3.72);
}
