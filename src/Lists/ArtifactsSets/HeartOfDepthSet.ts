import ArtifactSet from "@/Artifacts/ArtifactSet";
import { StatValue } from "@/Entities/Characters/CalculatorStats/Types/StatValue";
import Character from "@/Entities/Characters/Character";

export default class HeartOfDepthSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute HeartOfDepth 2");
    character.calculatorStats.hydroDmgBonus.additionalValues.add(
      new StatValue(15)
    );
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute HeartOfDepth 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove HeartOfDepth 2");
    character.calculatorStats.hydroDmgBonus.additionalValues.remove(
      new StatValue(15)
    );
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove HeartOfDepth 4");
  }
}
