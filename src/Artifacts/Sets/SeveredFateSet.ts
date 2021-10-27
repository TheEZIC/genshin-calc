import ArtifactSet from "../ArtifactSet";
import Character from "../../Characters/Character";

export default class SeveredFateSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute SeveredFate 2");
    character.calculatorStats.energyRecharge.addAdditionalValue(20);
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute SeveredFate 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove SeveredFate 2");
    character.calculatorStats.energyRecharge.removeAdditionalValue(20);
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove SeveredFate 4");
  }
}