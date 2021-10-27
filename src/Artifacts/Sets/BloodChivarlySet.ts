import ArtifactSet from "../ArtifactSet";
import Character from "../../Characters/Character";

export default class BloodChivarlySet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute BloodChivarly 2");
    character.calculatorStats.physicalDmgBonus.addAdditionalValue(25);
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute BloodChivarly 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove BloodChivarly 2");
    character.calculatorStats.physicalDmgBonus.removeAdditionalValue(25);
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove BloodChivarly 4");
  }
}