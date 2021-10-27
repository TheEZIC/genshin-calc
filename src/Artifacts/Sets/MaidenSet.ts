import ArtifactSet from "../ArtifactSet";
import Character from "../../Characters/Character";

export default class MaidenSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute Maiden 2");
    // healing effectivness
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute Maiden 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove Maiden 2");
    // healing effectivness
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove Maiden 4");
  }
}