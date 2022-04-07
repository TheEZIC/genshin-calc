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

  protected abstract usageValue: SkillValue;
  protected abstract summonValue: SkillValue;

  public get usageDmg() {
    return this.usageValue.getValue(this.lvl.current) / 100;
  }

  public get usageMVs(): number {
    return this.usageDmg / this.usageFrames;
  }

  public get durationDmg(): number {
    return this.summonValue.getValue(this.lvl.current) / 100;
  }

  public get durationMVs(): number {
    return this.durationDmg / this.durationFrames;
  }
}
