import ArtifactSet from "@/Artifacts/ArtifactSet";
import { StatValue } from "@/Entities/Characters/CalculatorStats/Types/StatValue";
import Character from "@/Entities/Characters/Character";

export default class PaleFlameSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute PaleFlame 2");
    character.calculatorStats.physicalDmgBonus.additionalValues.add(
      new StatValue(20)
    );
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute PaleFlame 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove PaleFlame 2");
    character.calculatorStats.physicalDmgBonus.additionalValues.remove(
      new StatValue(20)
    );
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove PaleFlame 4");
  }
}
