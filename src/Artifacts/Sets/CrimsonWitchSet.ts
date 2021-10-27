import ArtifactSet from "../ArtifactSet";
import Character from "../../Characters/Character";

export default class CrimsonWitchSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute CrimsonWitch 2");
    character.calculatorStats.pyroDmgBonus.addAdditionalValue(15);
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute CrimsonWitch 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove CrimsonWitch 2");
    character.calculatorStats.pyroDmgBonus.removeAdditionalValue(15);
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove CrimsonWitch 4");
  }
}