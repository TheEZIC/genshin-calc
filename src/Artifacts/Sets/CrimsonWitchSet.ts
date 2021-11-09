import ArtifactSet from "@/Artifacts/ArtifactSet";
import { StatValue } from "@/Characters/CalculatorStats/Types/StatValue";
import Character from "@/Characters/Character";

export default class CrimsonWitchSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute CrimsonWitch 2");
    character.calculatorStats.pyroDmgBonus.addAdditionalValue(
      new StatValue(15)
    );
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute CrimsonWitch 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove CrimsonWitch 2");
    character.calculatorStats.pyroDmgBonus.removeAdditionalValue(
      new StatValue(15)
    );
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove CrimsonWitch 4");
  }
}
