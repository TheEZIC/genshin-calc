import ArtifactSet from "@/Artifacts/ArtifactSet";
import { StatValue } from "@/Characters/CalculatorStats/Types/StatValue";
import Character from "@/Characters/Character";

export default class ThundersootherSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute Thundersoother 2");
    character.calculatorStats.electroResistance.addAdditionalValue(new StatValue(40));
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute Thundersoother 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove Thundersoother 2");
    character.calculatorStats.electroResistance.removeAdditionalValue(new StatValue(40));
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove Thundersoother 4");
  }
}
