import ArtifactSet from "../ArtifactSet";
import Character from "../../Characters/Character";

export default class BlizzardSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute Blizzard 2");
    character.calculatorStats.cryoDmgBonus.addAdditionalValue(15);
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute Blizzard 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove Blizzard 2");
    character.calculatorStats.cryoDmgBonus.removeAdditionalValue(15);
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove Blizzard 4");
  }
}