import ArtifactSet from "@/Artifacts/ArtifactSet";
import { StatValue } from "@/Characters/CalculatorStats/Types/StatValue";
import Character from "@/Characters/Character";

export default class PaleFlameSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute PaleFlame 2");
    character.calculatorStats.physicalDmgBonus.addAdditionalValue(new StatValue(20));
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute PaleFlame 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove PaleFlame 2");
    character.calculatorStats.physicalDmgBonus.removeAdditionalValue(new StatValue(20));
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove PaleFlame 4");
  }
}
