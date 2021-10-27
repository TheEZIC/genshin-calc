import ArtifactSet from "../ArtifactSet";
import Character from "../../Characters/Character";

export default class LuckyDogSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute LuckyDog 2");
    character.calculatorStats.DEF.addAdditionalValue(100);
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute LuckyDog 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove LuckyDog 2");
    character.calculatorStats.DEF.removeAdditionalValue(100);
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove LuckyDog 4");
  }
}