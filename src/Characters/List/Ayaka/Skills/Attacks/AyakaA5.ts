import SkillValue from "../../../../../Skills/SkillValue";
import NormalAttackSkill from "../../../../../Skills/NormalAttackSkill";
import AyakaNormalAttack from "./AyakaNormalAttack";

export default class AyakaA5 extends AyakaNormalAttack {
  frames: number = 136;
  value: SkillValue = new SkillValue(78.18, 6.37);
}