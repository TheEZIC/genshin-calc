import ArtifactSet from "@/Artifacts/ArtifactSet";
import { StatValue } from "@/Characters/CalculatorStats/Types/StatValue";
import Character from "@/Characters/Character";

export default class ArchaicSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute Archaic 2");
    character.calculatorStats.geoDmgBonus.additionalValues.add(new StatValue(15));
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute Archaic 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove Archaic 2");
    character.calculatorStats.geoDmgBonus.additionalValues.remove(
      new StatValue(15)
    );
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove Archaic 4");
  }
}
