import OverridableEffect from "@/Effects/OverridableEffect";
import Character from "@/Entities/Characters/Character";
import {SkillType} from "@/Skills/SkillType";
import {StatValue} from "@/Entities/Characters/CalculatorStats/Types/StatValue";

export default class AyakaTalent1Buff extends OverridableEffect<Character> {
  frames: number = 5 * 60; //5sec

  private talentAffix = new StatValue(30, [
    SkillType.NormalAttack,
    SkillType.HoldAttack
  ]);

  protected applyEffect(character: Character): void {
    character.calculatorStats.ATK.affixes.add(this.talentAffix);
  }

  protected removeEffect(character: Character): void {
    character.calculatorStats.ATK.affixes.remove(this.talentAffix);
  }
}
