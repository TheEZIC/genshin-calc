import ArtifactSet from "@/Artifacts/ArtifactSet";
import { StatValue } from "@/Entities/Characters/CalculatorStats/Types/StatValue";
import Character from "@/Entities/Characters/Character";

export default class BloodChivarlySet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute BloodChivarly 2");
    character.calculatorStats.physicalDmgBonus.additionalValues.add(
      new StatValue(25)
    );
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute BloodChivarly 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove BloodChivarly 2");
    character.calculatorStats.physicalDmgBonus.additionalValues.remove(
      new StatValue(25)
    );
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove BloodChivarly 4");
  }
}
