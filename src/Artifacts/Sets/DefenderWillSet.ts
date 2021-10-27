import ArtifactSet from "../ArtifactSet";
import Character from "../../Characters/Character";

export default class DefenderWillSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute DefenderWill 2");
    character.calculatorStats.DEF.addPrefix(30);
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute DefenderWill 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove DefenderWill 2");
    character.calculatorStats.DEF.remove(30);
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove DefenderWill 4");
  }
}