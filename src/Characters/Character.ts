import CharacterBaseStats from "./BaseStats/CharacterBaseStats";
import ArtifactsManager from "../Artifacts/ArtifactsManager";
import CalculatorStats from "./CalculatorStats/CalculatorStats";

export default abstract class Character {
  public calculatorStats = new CalculatorStats(this);
  public abstract baseStats: CharacterBaseStats;

  public artifacts: ArtifactsManager = new ArtifactsManager(this);
}