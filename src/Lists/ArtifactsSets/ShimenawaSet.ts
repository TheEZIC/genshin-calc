import ArtifactSet from "@/Artifacts/ArtifactSet";
import { StatValue } from "@/Entities/Characters/CalculatorStats/Types/StatValue";
import Character from "@/Entities/Characters/Character";

export default class ShimenawaSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute shimenawa 2");
    character.calculatorStats.ATK.prefixes.add(new StatValue(18));
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute shimenawa 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove shimenawa 2");
    character.calculatorStats.ATK.prefixes.remove(new StatValue(18));
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove shimenawa 4");
  }
}
