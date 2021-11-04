import Character from "../../../Character";
import SkillValue from "../../../../Skills/SkillValue";
import SummonSkill from "../../../../Skills/SummonSkill";
import {SkillType} from "../../../../Skills/SkillType";

export default class AyakaBurst extends SummonSkill {
  type: SkillType = SkillType.Elemental;

  summonUsageFrames: number = 95;
  summonDurationFrames: number = 5 * 60;

  protected summonValue: SkillValue = new SkillValue(168.45, 	181.08 - 168.45);
  protected usageValue: SkillValue = new SkillValue(112.3, 120.72 - 112.3);

  calcDamage(character: Character): number {
    const atk = character.calculatorStats.ATK.calc();
    return this.usageMVs * atk + this.durationMVs * atk * 19;
  }
}