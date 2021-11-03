import SkillValue from "../../../../../Skills/SkillValue";
import NormalAttackSkill from "../../../../../Skills/NormalAttackSkill";
import AyakaNormalAttack from "./AyakaNormalAttack";

export default class AyakaA1 extends AyakaNormalAttack {
  frames: number = 8;
  value: SkillValue = new SkillValue(45.73, 3.72);
}