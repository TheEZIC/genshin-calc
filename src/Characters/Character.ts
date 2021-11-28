import ArtifactsManager from "@/Artifacts/ArtifactsManager";
import ConstellationsManager from "@/Constellations/ConstellationsManager";
import SkillsManager from "@/Skills/SkillsManager";
import WeaponManager from "@/Weapons/WeaponManager";

import CalculatorStats from "./CalculatorStats/CalculatorStats";
import CharacterBaseStats from "./CharacterBaseStats";
import {VisionType} from "@/VisionType";
import Buff from "@/Buffs/Buff";

export default abstract class Character {
  public name = this.constructor.name;

  public abstract vision: VisionType;

  public ongoingBuffs: Buff[] = [];

  public abstract baseStats: CharacterBaseStats;
  public abstract skillManager: SkillsManager;
  public abstract constellationsManager: ConstellationsManager;

  public weaponManager: WeaponManager = new WeaponManager(this);
  public artifactsManager: ArtifactsManager = new ArtifactsManager(this);

  public calculatorStats = new CalculatorStats(this);
}
