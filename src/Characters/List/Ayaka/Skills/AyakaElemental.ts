import NormalSkill from "../../../../Skills/NormalSkill";
import Character from "../../../Character";
import SkillValue from "../../../../Skills/SkillValue";

export default class AyakaElemental extends NormalSkill {
  frames: number = 56;
  protected value: SkillValue = new SkillValue(239.2, 257.14 - 239.2);

  calcDamage(character: Character): number {
    const atk = character.calculatorStats.ATK.calc();
    return this.MVs * atk;
  }
}