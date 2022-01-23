import SkillValue from "@/Skills/SkillValue";
import SummonSkill from "@/Skills/SummonSkill";
import SkillStrategy from "@/Skills/SkillStrategy";
import BurstSkillStrategy from "@/Skills/SkillStrategy/BurstSkillStrategy";
import {ICalcDamageArgs} from "@/Skills/Skill";
import {SkillTargetType} from "@/Skills/SkillTargetType";

export default class AyakaBurst extends SummonSkill {
  strategy: SkillStrategy = new BurstSkillStrategy(this);

  summonUsageFrames: number = 95;
  summonDurationFrames: number = 5 * 60;

  skillTargetType: SkillTargetType = SkillTargetType.AOE;

  protected summonValue: SkillValue = new SkillValue(168.45, 181.08 - 168.45);
  protected usageValue: SkillValue = new SkillValue(112.3, 120.72 - 112.3);

  protected calcDamage({character}: ICalcDamageArgs): number {
    const atk = character.calculatorStats.ATK.calc();
    return this.usageMVs * atk + this.durationMVs * atk * 19;
  }
}
