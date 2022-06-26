import ArtifactSet from "@/Artifacts/ArtifactSet";
import { StatValue } from "@/CalculatorStats/StatValue";
import Character from "@/Entities/Characters/Character";

export default class TroupeSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    character.calculatorStats.elementalMastery.additionalValues.add(
      new StatValue(80)
    );
  }

  computeFourPieceBonuses(character: Character): void {
  }

  removeTwoSetBonuses(character: Character): void {
    character.calculatorStats.elementalMastery.additionalValues.remove(
      new StatValue(80)
    );
  }

  removeFourSetBonuses(character: Character): void {
  }
}
