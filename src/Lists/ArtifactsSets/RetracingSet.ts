import ArtifactSet from "@/Artifacts/ArtifactSet";
import Character from "@/Entities/Characters/Character";

export default class RetracingSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute Retracing 2");
    // shield strength
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute Retracing 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove Retracing 2");
    // shield strength
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove Retracing 4");
  }
}
