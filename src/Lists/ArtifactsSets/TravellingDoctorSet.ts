import ArtifactSet from "@/Artifacts/ArtifactSet";
import Character from "@/Characters/Character";

export default class TravellingDoctorSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute TravellingDoctor 2");
    // incoming healing by 20%
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute TravellingDoctor 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove TravellingDoctor 2");
    // incoming healing by 20%
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove TravellingDoctor 4");
  }
}
