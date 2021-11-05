import ArtifactSet from "@/Artifacts/ArtifactSet";
import Character from "@/Characters/Character";

export default class TenacitySet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute Tenacity 2");
    character.calculatorStats.HP.addPrefix(20);
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute Tenacity 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove Tenacity 2");
    character.calculatorStats.HP.removePrefix(20);
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove Tenacity 4");
  }
}
