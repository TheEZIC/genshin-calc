import ArtifactSet from "@/Artifacts/ArtifactSet";
import Character from "@/Characters/Character";

export default class ExileSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute Exile 2");
    character.calculatorStats.energyRecharge.addAdditionalValue(20);
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute Exile 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove Exile 2");
    character.calculatorStats.energyRecharge.removeAdditionalValue(20);
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove Exile 4");
  }
}
