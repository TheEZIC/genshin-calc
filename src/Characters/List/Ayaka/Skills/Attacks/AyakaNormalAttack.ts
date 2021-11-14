import Character from "@/Characters/Character";
import NormalAttackSkill from "@/Skills/NormalAttackSkill";
import {SkillType} from "@/Skills/SkillType";
import {DmgType} from "@/DmgType";

export default abstract class AyakaNormalAttack extends NormalAttackSkill {
  dmgType: DmgType = DmgType.Physical;
  type: SkillType = SkillType.Attack;
  override _hasInfusion = true;

  protected override calcDamage(character: Character): number {
    const atk = character.calculatorStats.ATK.calc();
    return this.MVs * atk;
  }
}
