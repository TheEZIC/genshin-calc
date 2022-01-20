import ArtifactSet from "@/Artifacts/ArtifactSet";
import { StatValue } from "@/Characters/CalculatorStats/Types/StatValue";
import Character from "@/Characters/Character";

export default class ExileSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute Exile 2");
    character.calculatorStats.energyRecharge.additionalValues.add(
      new StatValue(20)
    );
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute Exile 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove Exile 2");
    character.calculatorStats.energyRecharge.additionalValues.remove(
      new StatValue(20)
    );
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove Exile 4");
  }
}
