import Character from "../Characters/Character";
import ArtifactsManager from "./ArtifactsManager";

export default interface IArtifactSetStrategy {
  computeTwoPieceBonuses: (artifactManager: ArtifactsManager) => void;
  computeFourPieceBonuses: (artifactManager: ArtifactsManager) => void;
}