import ArtifactSet from "@/Artifacts/ArtifactSet";
import { StatValue } from "@/CalculatorStats/StatValue";
import Character from "@/Entities/Characters/Character";

export default class GladiatorSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    character.calculatorStats.ATK.prefixes.add(new StatValue(18));
  }

  computeFourPieceBonuses(character: Character): void {
  }

  removeTwoSetBonuses(character: Character): void {
    character.calculatorStats.ATK.prefixes.remove(new StatValue(18));
  }

  removeFourSetBonuses(character: Character): void {
  }
}
