import ArtifactSet from "@/Artifacts/ArtifactSet";
import { StatValue } from "@/Characters/CalculatorStats/Types/StatValue";
import Character from "@/Characters/Character";

export default class SeveredFateSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute SeveredFate 2");
    character.calculatorStats.energyRecharge.additionalValues.add(
      new StatValue(20)
    );
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute SeveredFate 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove SeveredFate 2");
    character.calculatorStats.energyRecharge.additionalValues.remove(
      new StatValue(20)
    );
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove SeveredFate 4");
  }
}
