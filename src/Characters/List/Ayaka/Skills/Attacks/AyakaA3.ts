import NormalAttackSkill from "@/Skills/NormalAttackSkill";
import SkillValue from "@/Skills/SkillValue";

import AyakaNormalAttack from "./AyakaNormalAttack";

export default class AyakaA3 extends AyakaNormalAttack {
  frames: number = 56;
  value: SkillValue = new SkillValue(62.62, 5.1);
}
