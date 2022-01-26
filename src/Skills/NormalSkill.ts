import Skill from "./Skill";
import SkillValue from "./SkillValue";

export default abstract class NormalSkill extends Skill {
  protected abstract value: SkillValue;

  public get MVs(): number {
    const dmg = this.value.getValueAtLvl(this.lvl);
    return dmg / (this.frames / (this.isMVsMode ? 60 : 1)) / 100;
  }

  public canceledFrames: number = 0;
  public canBeCanceled: boolean = false;

  public get canceledMVs(): number {
    const dmg = this.value.getValueAtLvl(this.currentLvl);
    return dmg / (this.canceledFrames / (this.isMVsMode ? 60 : 1)) / 100;
  }
}
