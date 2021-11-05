import ArtifactSet from "@/Artifacts/ArtifactSet";
import Character from "@/Characters/Character";

export default class ScholarSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute Scholar 2");
    character.calculatorStats.energyRecharge.addAdditionalValue(20);
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute Scholar 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove Scholar 2");
    character.calculatorStats.energyRecharge.addAdditionalValue(20);
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove Scholar 4");
  }
}
