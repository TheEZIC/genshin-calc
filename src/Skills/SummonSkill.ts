import NormalSkill from "./Skill";
import SkillValue from "./SkillValue";

export default abstract class SummonSkill extends NormalSkill {
  public abstract summonUsageFrames: number;
  public abstract summonDurationFrames: number;

  public skipUsageFrames: boolean = true;

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
}
