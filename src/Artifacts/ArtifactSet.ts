import Character from "@/Entities/Characters/Character";

import IArtifactSetStrategy from "./ArtifactSetStrategy";
import ArtifactsManager from "./ArtifactsManager";

export default abstract class ArtifactSet {
  //artifact set type is class name
  public type: string = this.constructor.name;

  /**
   * Apply two sets bonuses
   * @param {Character} character - character
   * */
  public abstract computeTwoPieceBonuses(character: Character): void;

  /**
   * Apply four sets bonuses
   * @param {Character} character - character
   * */
  public abstract computeFourPieceBonuses(character: Character): void;

  /**
   * Remove two sets bonuses
   * @param {Character} character - character
   * */
  public abstract removeTwoSetBonuses(character: Character): void;

  /**
   * Remove four sets bonuses
   * @param {Character} character - character
   * */
  public abstract removeFourSetBonuses(character: Character): void;
}
