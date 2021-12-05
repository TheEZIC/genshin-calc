import Character from "@/Characters/Character";
import NormalSkill from "@/Skills/NormalSkill";
import SkillStrategy from "@/Skills/SkillStrategy";
import NormalAttackSkillStrategy from "@/Skills/SkillStrategy/NormalAttackSkillStrategy";
import Buff from "@/Buffs/Buff";

export default abstract class AyakaNormalAttack extends NormalSkill {
  public strategy: SkillStrategy = new NormalAttackSkillStrategy(this);

  protected override calcDamage(character: Character): number {
    const atk = character.calculatorStats.ATK.calc();
    return this.MVs * atk;
  }

  protected _buffs: Buff[] = [];

  abortBuffs(character: Character): void {
  }

  initBuffs(character: Character): void {
  }
}
