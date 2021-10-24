import Artifact from "../Artifact";
import {ArtifactAllStats, ArtifactStatType} from "../ArtifactStatType";
import {ArtifactType} from "../ArtifactType";

export default class ArtifactSands extends Artifact {
  public readonly type: ArtifactType = ArtifactType.Sands;
  protected readonly allowedMainStats: ArtifactStatType[] = [
    ArtifactStatType.PercentATK,
    ArtifactStatType.PercentDEF,
    ArtifactStatType.PercentHP,
    ArtifactStatType.ElementalMastery,
    ArtifactStatType.EnergyRecharge,
  ];
}