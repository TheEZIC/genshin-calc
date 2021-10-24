import CharacterBaseStats from "./Stats/CharacterBaseStats";
import ArtifactsManager from "../Artifacts/ArtifactsManager";

export default abstract class Character {
  public abstract baseStats: CharacterBaseStats;
  public artifacts: ArtifactsManager = new ArtifactsManager();
}