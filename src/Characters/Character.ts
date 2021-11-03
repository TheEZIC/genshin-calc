import CharacterBaseStats from "./CharacterBaseStats";
import ArtifactsManager from "../Artifacts/ArtifactsManager";
import CalculatorStats from "./CalculatorStats/CalculatorStats";
import WeaponManager from "../Weapons/WeaponManager";
import Skill from "../Skills/Skill";
import SkillsManager from "../Skills/SkillsManager";

export default abstract class Character {
  public abstract baseStats: CharacterBaseStats;
  public abstract skillManager: SkillsManager;

  public weaponManager = new WeaponManager(this);
  public artifactsManager: ArtifactsManager = new ArtifactsManager(this);

  public calculatorStats = new CalculatorStats(this);
}