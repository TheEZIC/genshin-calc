import OverridableEffect from "@/Effects/OverridableEffect";
import Character from "@/Entities/Characters/Character";
import {StatValue} from "@/CalculatorStats/StatValue";

export default class AyakaTalent2Buff extends OverridableEffect<Character> {
  public frames: number = 10 * 60; //10sec

  private talentCryoDmgValue = new StatValue(18);

  protected applyEffect(character: Character): void {
    character.calculatorStats
      .cryoDmgBonus
      .additionalValues.add(this.talentCryoDmgValue)
  }

  protected removeEffect(character: Character): void {
    character.calculatorStats
      .cryoDmgBonus
      .additionalValues.remove(this.talentCryoDmgValue)
  }
}
