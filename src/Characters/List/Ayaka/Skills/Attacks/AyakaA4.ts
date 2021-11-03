import SkillValue from "../../../../../Skills/SkillValue";
import NormalAttackSkill from "../../../../../Skills/NormalAttackSkill";
import AyakaNormalAttack from "./AyakaNormalAttack";
import Character from "../../../../Character";

export default class AyakaA4 extends AyakaNormalAttack {
  frames: number = 98 / 3;
  value: SkillValue = new SkillValue(22.65, 1.84);

  public override calcDamage(character: Character): number {
    return super.calcDamage(character) * 3;
  }
}