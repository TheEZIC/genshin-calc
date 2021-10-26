import ArtifactSet from "../ArtifactSet";
import Character from "../../Characters/Character";

export default class TroupeSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute troupe 2");
    character.calculatorStats.elementalMastery.addAdditionalValue(80);
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute troupe 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove troupe 2");
    character.calculatorStats.elementalMastery.removeAdditionalValue(80);
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove troupe 4");
  }
}