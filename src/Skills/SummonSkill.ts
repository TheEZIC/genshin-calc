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

  public get usageMVs(): number {
    const dmg = this.usageValue.getValueAtLvl(this.lvl);
    return dmg / (this.usageFrames / (this.isMVsMode ? 60 : 1)) / 100;
  }

  public get durationMVs(): number {
    const dmg = this.summonValue.getValueAtLvl(this.lvl);
    return dmg / (this.durationFrames / (this.isMVsMode ? 60 : 1)) / 100;
  }
}
