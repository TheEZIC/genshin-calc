import {SkillTargetType} from "@/Skills/SkillTargetType";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import NormalAttackSkillStage from "@/Skills/NormalAttackSkillStage";

export default abstract class XianglingNormalAttackStage extends NormalAttackSkillStage {
  public targetType: SkillTargetType = SkillTargetType.Single;
  public damageRegistrationType: SkillDamageRegistrationType = SkillDamageRegistrationType.Adaptive;
}
