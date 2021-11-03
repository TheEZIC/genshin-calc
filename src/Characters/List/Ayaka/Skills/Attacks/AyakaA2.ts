import SkillValue from "../../../../../Skills/SkillValue";
import NormalAttackSkill from "../../../../../Skills/NormalAttackSkill";
import AyakaNormalAttack from "./AyakaNormalAttack";

export default class AyakaA2 extends AyakaNormalAttack {
  frames: number = 28;
  value: SkillValue = new SkillValue(48.68, 3.97);
}