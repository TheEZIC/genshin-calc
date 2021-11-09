import ArtifactSet from "@/Artifacts/ArtifactSet";
import { StatValue } from "@/Characters/CalculatorStats/Types/StatValue";
import Character from "@/Characters/Character";

export default class BlizzardSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute Blizzard 2");
    character.calculatorStats.cryoDmgBonus.addAdditionalValue(
      new StatValue(15)
    );
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute Blizzard 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove Blizzard 2");
    character.calculatorStats.cryoDmgBonus.removeAdditionalValue(
      new StatValue(15)
    );
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove Blizzard 4");
  }
}
