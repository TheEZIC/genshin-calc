import Artifact from "../Artifact";
import {ArtifactAllStats, ArtifactStatType} from "../ArtifactStatType";
import {ArtifactType} from "../ArtifactType";

export default class ArtifactCirclet extends Artifact {
  public readonly type: ArtifactType = ArtifactType.Circlet;
  protected readonly allowedMainStats: ArtifactStatType[] = [
    ArtifactStatType.PercentATK,
    ArtifactStatType.PercentDEF,
    ArtifactStatType.PercentHP,
    ArtifactStatType.ElementalMastery,
    ArtifactStatType.CritChance,
    ArtifactStatType.CritDamage,
  ];
}