import Skill from "./Skill";
import SkillValue from "./SkillValue";

export default abstract class NormalSkill extends Skill {
  protected abstract value: SkillValue;

  public get dmg(): number {
    return this.value.getValueAtLvl(this.lvl.current) / 100;
  }

  public get MVs(): number {
    return this.dmg / this.frames;
  }

  public canceledFrames: number = 0;
  public canBeCanceled: boolean = false;

  public get canceledMVs(): number {
    return this.dmg / this.canceledFrames;
  }
}
