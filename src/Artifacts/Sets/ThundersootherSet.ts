import ArtifactSet from "../ArtifactSet";
import Character from "../../Characters/Character";

export default class ThundersootherSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute Thundersoother 2");
    character.calculatorStats.electroResistance.addAdditionalValue(40);
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute Thundersoother 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove Thundersoother 2");
    character.calculatorStats.electroResistance.removeAdditionalValue(40);
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove Thundersoother 4");
  }
}