import NormalAttackSkill from "../../../../../Skills/NormalAttackSkill";
import Character from "../../../../Character";

export default abstract class AyakaNormalAttack extends NormalAttackSkill {
  override calcDamage(character: Character): number {
    const atk = character.calculatorStats.ATK.calc();
    return this.MVs * atk;
  }
}