import ArtifactSet from "@/Artifacts/ArtifactSet";
import Character from "@/Entities/Characters/Character";

export default class GamblerSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute Gambler 2");
    // elemental skill by 20%
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute Gambler 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove Gambler 2");
    // elemental skill by 20%
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove Gambler 4");
  }
}
