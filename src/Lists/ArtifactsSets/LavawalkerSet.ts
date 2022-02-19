import ArtifactSet from "@/Artifacts/ArtifactSet";
import { StatValue } from "@/Entities/Characters/CalculatorStats/Types/StatValue";
import Character from "@/Entities/Characters/Character";

export default class LavawalkerSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute Lavawalker 2");
    character.calculatorStats.pyroResistance.additionalValues.add(
      new StatValue(40)
    );
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute Lavawalker 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove Lavawalker 2");
    character.calculatorStats.pyroResistance.additionalValues.remove(
      new StatValue(40)
    );
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove Lavawalker 4");
  }
}
