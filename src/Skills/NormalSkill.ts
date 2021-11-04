import SkillValue from "./SkillValue";
import Skill from "./Skill";

export default abstract class NormalSkill extends Skill {
  public abstract frames: number;
  protected abstract value: SkillValue;

  public get MVs (): number {
    const dmg = this.value.getValueAtLvl(this.currentLvl);
    return dmg / (this.frames / 60) / 100
  }

  public canceledFrames: number = 0;
  public canBeCanceled: boolean = false;

  public get canceledMVs(): number {
    const dmg = this.value.getValueAtLvl(this.currentLvl);
    return dmg / (this.canceledFrames / 60) / 100;
  }
}