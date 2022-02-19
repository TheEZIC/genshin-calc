import ArtifactSet from "@/Artifacts/ArtifactSet";
import { StatValue } from "@/Entities/Characters/CalculatorStats/Types/StatValue";
import Character from "@/Entities/Characters/Character";

export default class TroupeSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute troupe 2");
    character.calculatorStats.elementalMastery.additionalValues.add(
      new StatValue(80)
    );
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute troupe 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove troupe 2");
    character.calculatorStats.elementalMastery.additionalValues.remove(
      new StatValue(80)
    );
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove troupe 4");
  }
}
