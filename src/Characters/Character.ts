import CharacterBaseStats from "./CharacterBaseStats";
import ArtifactsManager from "../Artifacts/ArtifactsManager";
import CalculatorStats from "./CalculatorStats/CalculatorStats";
import WeaponManager from "../Weapons/WeaponManager";

export default abstract class Character {
  public abstract baseStats: CharacterBaseStats;

  public weaponManager = new WeaponManager(this);
  public artifactsManager: ArtifactsManager = new ArtifactsManager(this);

  public calculatorStats = new CalculatorStats(this);
}