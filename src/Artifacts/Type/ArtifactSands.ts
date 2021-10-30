import Artifact from "../Artifact";
import {AllStatsType, StatType} from "../../BaseStats/StatType";
import {ArtifactType} from "../ArtifactType";

export default class ArtifactSands extends Artifact {
  public readonly type: ArtifactType = ArtifactType.Sands;
  protected readonly allowedMainStats: StatType[] = [
    StatType.PercentATK,
    StatType.PercentDEF,
    StatType.PercentHP,
    StatType.ElementalMastery,
    StatType.EnergyRecharge,
  ];
}