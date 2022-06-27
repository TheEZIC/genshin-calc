import SkillStrategy from "@/Skills/SkillStrategy";
import HoldAttackSkillStrategy from "@/Skills/SkillStrategy/HoldAttackSkillStrategy";
import NormalAttackSkillStage from "@/Skills/Defaults/NormalAttackSkillStage";

export default abstract class HoldAttackSkill extends NormalAttackSkillStage {
  public override strategy: SkillStrategy = new HoldAttackSkillStrategy(this);
}
