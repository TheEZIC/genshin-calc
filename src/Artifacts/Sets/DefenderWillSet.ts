import ArtifactSet from "@/Artifacts/ArtifactSet";
import { StatValue } from "@/Characters/CalculatorStats/Types/StatValue";
import Character from "@/Characters/Character";

export default class DefenderWillSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute DefenderWill 2");
    character.calculatorStats.DEF.addPrefix(new StatValue(30));
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute DefenderWill 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove DefenderWill 2");
    character.calculatorStats.DEF.removePrefix(new StatValue(30));
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove DefenderWill 4");
  }
}
