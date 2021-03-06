import ArtifactSet from "@/Artifacts/ArtifactSet";
import { StatValue } from "@/CalculatorStats/StatValue";
import Character from "@/Entities/Characters/Character";

export default class BlizzardSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute Blizzard 2");
    character.calculatorStats.cryoDmgBonus.additionalValues.add(
      new StatValue(15)
    );
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute Blizzard 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove Blizzard 2");
    character.calculatorStats.cryoDmgBonus.additionalValues.remove(
      new StatValue(15)
    );
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove Blizzard 4");
  }
}
