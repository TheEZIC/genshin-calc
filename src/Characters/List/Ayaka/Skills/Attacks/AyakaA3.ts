import SkillValue from "@/Skills/SkillValue";

import AyakaNormalAttack from "./AyakaNormalAttack";
import SkillsManager from "@/Skills/SkillsManager";

export default class AyakaA3 extends AyakaNormalAttack {
  frames: number = 56;
  value: SkillValue = new SkillValue(62.62, 5.1);
}
