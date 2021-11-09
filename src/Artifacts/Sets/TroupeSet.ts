import ArtifactSet from "@/Artifacts/ArtifactSet";
import { StatValue } from "@/Characters/CalculatorStats/Types/StatValue";
import Character from "@/Characters/Character";

export default class TroupeSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute troupe 2");
    character.calculatorStats.elementalMastery.addAdditionalValue(
      new StatValue(80)
    );
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute troupe 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove troupe 2");
    character.calculatorStats.elementalMastery.removeAdditionalValue(
      new StatValue(80)
    );
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove troupe 4");
  }
}
