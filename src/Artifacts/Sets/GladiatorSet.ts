import ArtifactSet from "@/Artifacts/ArtifactSet";
import { StatValue } from "@/Characters/CalculatorStats/Types/StatValue";
import Character from "@/Characters/Character";

export default class GladiatorSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute gladiator 2");
    character.calculatorStats.ATK.addPrefix(new StatValue(18));
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute gladiator 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove gladiator 2");
    character.calculatorStats.ATK.removePrefix(new StatValue(18));
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove gladiator 4");
  }
}
