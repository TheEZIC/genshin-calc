import ArtifactSet from "@/Artifacts/ArtifactSet";
import Character from "@/Characters/Character";

export default class LavawalkerSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute Lavawalker 2");
    character.calculatorStats.pyroResistance.addAdditionalValue(40);
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute Lavawalker 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove Lavawalker 2");
    character.calculatorStats.pyroResistance.removeAdditionalValue(40);
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove Lavawalker 4");
  }
}
