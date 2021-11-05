import ArtifactSet from "@/Artifacts/ArtifactSet";
import Character from "@/Characters/Character";

export default class ResolutionSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute Resolution 2");
    character.calculatorStats.ATK.addPrefix(18);
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute Resolution 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove Resolution 2");
    character.calculatorStats.ATK.removePrefix(18);
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove Resolution 4");
  }
}
