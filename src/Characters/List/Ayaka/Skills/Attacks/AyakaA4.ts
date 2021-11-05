import Character from "@/Characters/Character";
import NormalAttackSkill from "@/Skills/NormalAttackSkill";
import SkillValue from "@/Skills/SkillValue";

import AyakaNormalAttack from "./AyakaNormalAttack";

export default class AyakaA4 extends AyakaNormalAttack {
  frames: number = 98;
  value: SkillValue = new SkillValue(22.65 * 3, 1.84 * 3);
}
