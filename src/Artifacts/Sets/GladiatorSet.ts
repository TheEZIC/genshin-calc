import ArtifactSet from "../ArtifactSet";
import Character from "../../Characters/Character";

export default class GladiatorSet extends ArtifactSet {
  protected executeFourLogic(character: Character): void {
    character.calculatorStats.ATK.addPrefix(18);
  }

  protected executeTwoLogic(character: Character): void {
    //...
  }
}