import Artifact from "../Artifact";
import {ArtifactStatType} from "../ArtifactStatType";
import {ArtifactType} from "../ArtifactType";

export default class ArtifactGoblet extends Artifact {
  public readonly type: ArtifactType = ArtifactType.Goblet;
  protected readonly allowedMainStats: ArtifactStatType[] = [
    ArtifactStatType.PercentATK,
    ArtifactStatType.PercentDEF,
    ArtifactStatType.PercentHP,
    ArtifactStatType.ElementalMastery,
    ArtifactStatType.PhysicalDmgBonus,
    ArtifactStatType.PyroDmgBonus,
    ArtifactStatType.HydroDmgBonus,
    ArtifactStatType.AnemoDmgBonus,
    ArtifactStatType.ElectroDmgBonus,
    ArtifactStatType.DendroDmgBonus,
    ArtifactStatType.CryoDmgBonus,
    ArtifactStatType.GeoDmgBonus,
  ];
}