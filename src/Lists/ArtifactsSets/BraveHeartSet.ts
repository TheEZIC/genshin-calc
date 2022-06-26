import ArtifactSet from "@/Artifacts/ArtifactSet";
import { StatValue } from "@/CalculatorStats/StatValue";
import Character from "@/Entities/Characters/Character";

export default class BraveHeartSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute BraveHeart 2");
    character.calculatorStats.ATK.prefixes.add(new StatValue(18));
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute BraveHeart 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove BraveHeart 2");
    character.calculatorStats.ATK.prefixes.remove(new StatValue(18));
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove BraveHeart 4");
  }
}
