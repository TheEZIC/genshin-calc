import ArtifactSet from "@/Artifacts/ArtifactSet";
import { StatValue } from "@/Characters/CalculatorStats/Types/StatValue";
import Character from "@/Characters/Character";

export default class DefenderWillSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute DefenderWill 2");
    character.calculatorStats.DEF.prefixes.add(new StatValue(30));
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute DefenderWill 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove DefenderWill 2");
    character.calculatorStats.DEF.prefixes.remove(new StatValue(30));
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove DefenderWill 4");
  }
}
