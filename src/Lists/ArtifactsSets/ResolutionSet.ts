import ArtifactSet from "@/Artifacts/ArtifactSet";
import { StatValue } from "@/CalculatorStats/StatValue";
import Character from "@/Entities/Characters/Character";

export default class ResolutionSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute Resolution 2");
    character.calculatorStats.ATK.prefixes.add(new StatValue(18));
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute Resolution 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove Resolution 2");
    character.calculatorStats.ATK.prefixes.remove(new StatValue(18));
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove Resolution 4");
  }
}
