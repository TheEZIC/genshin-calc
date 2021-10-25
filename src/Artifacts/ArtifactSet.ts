import IArtifactSetStrategy from "./ArtifactSetStrategy";
import ArtifactsManager from "./ArtifactsManager";
import Character from "../Characters/Character";

export default abstract class ArtifactSet implements IArtifactSetStrategy {
  protected abstract executeTwoLogic(character: Character): void;
  protected abstract executeFourLogic(character: Character): void;

  computeTwoPieceBonuses(artifactManager: ArtifactsManager): void {
    this.executeTwoLogic(artifactManager.character);
    artifactManager.calcSetBonuses();
  }

  computeFourPieceBonuses(artifactManager: ArtifactsManager): void {
    this.executeFourLogic(artifactManager.character);
    artifactManager.calcSetBonuses();
  }
}