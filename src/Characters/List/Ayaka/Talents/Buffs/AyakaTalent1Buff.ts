import Effect from "@/Effects/Effect";
import Character from "@/Characters/Character";
import {SkillType} from "@/Skills/SkillType";
import {StatValue} from "@/Characters/CalculatorStats/Types/StatValue";

export default class AyakaTalent1Buff extends Effect<Character> {
  framesDuration: number = 5 * 60; //5sec

  private talentAffix = new StatValue(30, [
    SkillType.NormalAttack,
    SkillType.HoldAttack
  ]);

  protected applyEffect(character: Character): void {
    character.calculatorStats.ATK.addAffix(this.talentAffix);
  }

  protected removeEffect(character: Character): void {
    character.calculatorStats.ATK.removeAffix(this.talentAffix);
  }
}
