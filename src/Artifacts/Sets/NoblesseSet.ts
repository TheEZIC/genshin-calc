import ArtifactSet from "../ArtifactSet";
import Character from "../../Characters/Character";

export default class NoblesseSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute Noblesse 2");
    // Elemental burst
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute Noblesse 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove Noblesse 2");
    // Elemental burst
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove Noblesse 4");
  }
}