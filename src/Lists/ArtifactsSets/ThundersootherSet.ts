import ArtifactSet from "@/Artifacts/ArtifactSet";
import { StatValue } from "@/CalculatorStats/StatValue";
import Character from "@/Entities/Characters/Character";

export default class ThundersootherSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute Thundersoother 2");
    character.calculatorStats.electroResistance.additionalValues.add(
      new StatValue(40)
    );
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute Thundersoother 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove Thundersoother 2");
    character.calculatorStats.electroResistance.additionalValues.remove(
      new StatValue(40)
    );
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove Thundersoother 4");
  }
}
