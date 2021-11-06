import ArtifactSet from "@/Artifacts/ArtifactSet";
import { StatValue } from "@/Characters/CalculatorStats/Types/StatValue";
import Character from "@/Characters/Character";

export default class ShimenawaSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute shimenawa 2");
    character.calculatorStats.ATK.addPrefix(new StatValue(18));
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute shimenawa 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove shimenawa 2");
    character.calculatorStats.ATK.removePrefix(new StatValue(18));
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove shimenawa 4");
  }
}
