import ArtifactsManager from "@/Artifacts/ArtifactsManager";
import BurstConstellation from "@/Constellations/BurstConstellation";
import ConstellationsManager from "@/Constellations/ConstellationsManager";
import NormalSkill from "@/Skills/Skill";
import SkillsManager from "@/Skills/SkillsManager";
import WeaponManager from "@/Weapons/WeaponManager";

import CalculatorStats from "./CalculatorStats/CalculatorStats";
import CharacterBaseStats from "./CharacterBaseStats";
import {VisionType} from "@/VisionType";
import Roster from "@/Roster/Roster";

export default abstract class Character {
  constructor(
    public roster: Roster
  ) {
  }

  public name = this.constructor.name;

  public abstract vision: VisionType;

  public abstract baseStats: CharacterBaseStats;
  public abstract skillManager: SkillsManager;
  public abstract constellationsManager: ConstellationsManager;

  public weaponManager: WeaponManager = new WeaponManager(this);
  public artifactsManager: ArtifactsManager = new ArtifactsManager(this);

  public calculatorStats = new CalculatorStats(this);
}
