import ArtifactSet from "@/Artifacts/ArtifactSet";
import Character from "@/Characters/Character";

export default class MartialArtistSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute MartialArtist 2");
    // normal and charged attack by 15%
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute MartialArtist 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove MartialArtist 2");
    // normal and charged attack by 15%
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove MartialArtist 4");
  }
}
