import ArtifactSet from "../ArtifactSet";
import Character from "../../Characters/Character";

export default class GladiatorSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute gladiator")
    character.calculatorStats.ATK.addPrefix(18);
  }

  computeFourPieceBonuses(character: Character): void {
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove gladiator")
    character.calculatorStats.ATK.removePrefix(18);
  }

  removeFourSetBonuses(character: Character): void {
  }
}