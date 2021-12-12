import Effect from "@/Effects/Effect";
import Character from "@/Characters/Character";
import {StatValue} from "@/Characters/CalculatorStats/Types/StatValue";

export default class AyakaTalent2Buff extends Effect {
  framesDuration: number = 10 * 60; //10sec

  private talentCryDmgValue = new StatValue(18);

  protected applyEffect(character: Character): void {
    character.calculatorStats
      .cryoDmgBonus
      .addAdditionalValue(this.talentCryDmgValue)
  }

  protected removeEffect(character: Character): void {
    character.calculatorStats
      .cryoDmgBonus
      .removeAdditionalValue(this.talentCryDmgValue)
  }
}
