import ArtifactSet from "@/Artifacts/ArtifactSet";
import { StatValue } from "@/Entities/Characters/CalculatorStats/Types/StatValue";
import Character from "@/Entities/Characters/Character";

export default class ThunderingFurySet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute ThunderingFury 2");
    character.calculatorStats.electroDmgBonus.additionalValues.add(
      new StatValue(15)
    );
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute ThunderingFury 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove ThunderingFury 2");
    character.calculatorStats.electroDmgBonus.additionalValues.remove(
      new StatValue(15)
    );
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove ThunderingFury 4");
  }
}
