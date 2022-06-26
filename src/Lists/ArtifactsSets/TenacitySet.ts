import ArtifactSet from "@/Artifacts/ArtifactSet";
import { StatValue } from "@/CalculatorStats/StatValue";
import Character from "@/Entities/Characters/Character";

export default class TenacitySet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute Tenacity 2");
    character.calculatorStats.HP.prefixes.add(new StatValue(20));
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute Tenacity 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove Tenacity 2");
    character.calculatorStats.HP.prefixes.remove(new StatValue(20));
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove Tenacity 4");
  }
}
