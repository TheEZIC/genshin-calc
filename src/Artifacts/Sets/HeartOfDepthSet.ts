import ArtifactSet from "../ArtifactSet";
import Character from "../../Characters/Character";

export default class HeartOfDepthSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute HeartOfDepth 2");
    character.calculatorStats.hydroDmgBonus.addAdditionalValue(15);
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute HeartOfDepth 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove HeartOfDepth 2");
    character.calculatorStats.hydroDmgBonus.removeAdditionalValue(15);
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove HeartOfDepth 4");
  }
}