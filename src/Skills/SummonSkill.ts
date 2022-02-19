import NormalSkill from "./Skill";
import SkillValue from "./SkillValue";

export default abstract class SummonSkill extends NormalSkill {
  public abstract summonUsageFrames: number;
  public abstract summonDurationFrames: number;

  private get usageFrames(): number {
    return this.summonUsageFrames;
  }

  private get durationFrames(): number {
    return this.summonDurationFrames;
  }

  public override get timelineDurationFrames(): number {
    return this.usageFrames;
  }

  public get frames() {
    return this.usageFrames + this.durationFrames;
  }

  protected abstract usageValue: SkillValue;
  protected abstract summonValue: SkillValue;

  public get usageDmg() {
    return this.usageValue.getValueAtLvl(this.lvl.current);
  }

  public get usageMVs(): number {
    return this.usageDmg / (this.usageFrames / (this.isMVsMode ? 60 : 1)) / 100;
  }

  public get durationDmg(): number {
    return this.summonValue.getValueAtLvl(this.lvl.current);
  }

  public get durationMVs(): number {
    return this.durationDmg / (this.durationFrames / (this.isMVsMode ? 60 : 1)) / 100;
  }
}
