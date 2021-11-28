import Character from "@/Characters/Character";
import { SkillType } from "@/Skills/SkillType";
import SkillValue from "@/Skills/SkillValue";
import SummonSkill from "@/Skills/SummonSkill";
import SkillStrategy from "@/Skills/SkillStrategy";
import BurstSkillStrategy from "@/Skills/SkillStrategy/BurstSkillStrategy";

export default class AyakaBurst extends SummonSkill {
  strategy: SkillStrategy = new BurstSkillStrategy(this);

  summonUsageFrames: number = 95;
  summonDurationFrames: number = 5 * 60;

  protected summonValue: SkillValue = new SkillValue(168.45, 181.08 - 168.45);
  protected usageValue: SkillValue = new SkillValue(112.3, 120.72 - 112.3);

  protected calcDamage(character: Character): number {
    const atk = character.calculatorStats.ATK.calc();
    return this.usageMVs * atk + this.durationMVs * atk * 19;
  }
}