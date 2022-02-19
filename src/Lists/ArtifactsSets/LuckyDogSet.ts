import ArtifactSet from "@/Artifacts/ArtifactSet";
import { StatValue } from "@/Entities/Characters/CalculatorStats/Types/StatValue";
import Character from "@/Entities/Characters/Character";

export default class LuckyDogSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute LuckyDog 2");
    character.calculatorStats.DEF.additionalValues.add(new StatValue(100));
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute LuckyDog 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove LuckyDog 2");
    character.calculatorStats.DEF.additionalValues.remove(new StatValue(100));
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove LuckyDog 4");
  }
}
