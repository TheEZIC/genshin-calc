import NormalAttackSkill from "../../../../../Skills/NormalAttackSkill";
import Character from "../../../../Character";
import {SkillType} from "../../../../../Skills/SkillType";

export default abstract class AyakaNormalAttack extends NormalAttackSkill {
  type: SkillType = SkillType.Attack;

  override calcDamage(character: Character): number {
    const atk = character.calculatorStats.ATK.calc();
    return this.MVs * atk;
  }
}