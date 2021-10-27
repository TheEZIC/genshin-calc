import ArtifactSet from "../ArtifactSet";
import Character from "../../Characters/Character";

export default class ThunderingFurySet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute ThunderingFury 2");
    character.calculatorStats.electroDmgBonus.addAdditionalValue(15);
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute ThunderingFury 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove ThunderingFury 2");
    character.calculatorStats.electroDmgBonus.removeAdditionalValue(15);
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove ThunderingFury 4");
  }
}