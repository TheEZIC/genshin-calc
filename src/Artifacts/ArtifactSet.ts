import IArtifactSetStrategy from "./ArtifactSetStrategy";
import ArtifactsManager from "./ArtifactsManager";
import Character from "../Characters/Character";

export default abstract class ArtifactSet {
  //artifact set type is class name
  public type: string = this.constructor.name;

  public abstract computeTwoPieceBonuses(character: Character): void;
  public abstract computeFourPieceBonuses(character: Character): void;

  public abstract removeTwoSetBonuses(character: Character): void
  public abstract removeFourSetBonuses(character: Character): void;
}