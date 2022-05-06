import ArtifactsManager from "@/Artifacts/ArtifactsManager";
import ConstellationsManager from "@/Constellations/ConstellationsManager";
import SkillsManager from "@/Skills/SkillsManager";
import WeaponManager from "@/Weapons/WeaponManager";

import CalculatorStats from "./CalculatorStats/CalculatorStats";
import CharacterBaseStats from "./CharacterBaseStats";
import {VisionType} from "@/VisionType";
import SkillsListeners from "@/Skills/SkillsListeners";
import CharacterTalent from "@/Entities/Characters/CharacterTalent";
import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";
import {SkillType} from "@/Skills/SkillType";
import {IBurstSkill} from "@/Skills/SkillTypes/IBurstSkill";
import Entity from "@/Entities/Entity";
import {RefreshableClass} from "@/Refresher/RefreshableClass";
import {RefreshableProperty} from "@/Refresher/RefreshableProperty";

@RefreshableClass
export default abstract class Character extends Entity implements IWithOngoingEffects {
  public abstract vision: VisionType;

  public talent1: CharacterTalent | null = null;
  public talent2: CharacterTalent | null = null;

  public listeners: SkillsListeners = new SkillsListeners();

  public abstract baseStats: CharacterBaseStats;
  public abstract skillManager: SkillsManager;
  public abstract constellationsManager: ConstellationsManager;

  public weaponManager: WeaponManager = new WeaponManager(this);
  public artifactsManager: ArtifactsManager = new ArtifactsManager(this);

  public calculatorStats = new CalculatorStats(this);

  @RefreshableProperty()
  private _currentEnergy: number = 90;

  public get energy() {
    return this._currentEnergy;
  }

  private set energy(energy: number) {
    this._currentEnergy = energy;
  }

  public addEnergy(energy: number): void {
    this.energy += energy;
    const burst = this.skillManager.getSkillByType(SkillType.Burst) as unknown as IBurstSkill;

    if (burst && this.energy > burst.energyCost) {
      this.energy = burst.energyCost;
    }
  }

  public consumeEnergy(energy: number) {
    this.energy -= energy;

    if (this.energy < 0) {
      this.energy = 0;
    }
  }
}
