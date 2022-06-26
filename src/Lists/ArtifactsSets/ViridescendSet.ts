import ArtifactSet from "@/Artifacts/ArtifactSet";
import { StatValue } from "@/CalculatorStats/StatValue";
import Character from "@/Entities/Characters/Character";

export default class ViridescendSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute Viridescend 2");
    character.calculatorStats.anemoDmgBonus.additionalValues.add(
      new StatValue(15)
    );
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute Viridescend 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove Viridescend 2");
    character.calculatorStats.anemoDmgBonus.additionalValues.remove(
      new StatValue(15)
    );
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove Viridescend 4");
  }
}
