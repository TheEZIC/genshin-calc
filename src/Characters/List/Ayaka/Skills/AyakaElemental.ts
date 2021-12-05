import Character from "@/Characters/Character";
import NormalSkill from "@/Skills/NormalSkill";
import SkillValue from "@/Skills/SkillValue";
import SkillStrategy from "@/Skills/SkillStrategy";
import ElementalSkillStrategy from "@/Skills/SkillStrategy/ElementalSkillStrategy";
import SkillsManager from "@/Skills/SkillsManager";
import Buff from "@/Buffs/Buff";

export default class AyakaElemental extends NormalSkill {
  strategy: SkillStrategy = new ElementalSkillStrategy(this);

  frames: number = 56;
  protected value: SkillValue = new SkillValue(239.2, 257.14 - 239.2);

  protected calcDamage(character: Character): number {
    const atk = character.calculatorStats.ATK.calc();
    return this.MVs * atk;
  }

  protected _buffs: Buff[] = [];

  abortBuffs(character: Character): void {
  }

  initBuffs(character: Character): void {
  }
}
