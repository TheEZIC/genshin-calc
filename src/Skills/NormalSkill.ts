import Skill from "./Skill";
import SkillValue from "./SkillValue";

export default abstract class NormalSkill extends Skill {
  public canceledFrames: number = 0;
  public canBeCanceled: boolean = false;
}
