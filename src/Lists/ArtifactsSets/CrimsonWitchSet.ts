import ArtifactSet from "@/Artifacts/ArtifactSet";
import { StatValue } from "@/CalculatorStats/StatValue";
import Character from "@/Entities/Characters/Character";

export default class CrimsonWitchSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute CrimsonWitch 2");
    character.calculatorStats.pyroDmgBonus.additionalValues.add(
      new StatValue(15)
    );
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute CrimsonWitch 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove CrimsonWitch 2");
    character.calculatorStats.pyroDmgBonus.additionalValues.remove(
      new StatValue(15)
    );
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove CrimsonWitch 4");
  }
}
