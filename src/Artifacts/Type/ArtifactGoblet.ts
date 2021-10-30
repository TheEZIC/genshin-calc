import Artifact from "../Artifact";
import {StatType} from "../../BaseStats/StatType";
import {ArtifactType} from "../ArtifactType";

export default class ArtifactGoblet extends Artifact {
  public readonly type: ArtifactType = ArtifactType.Goblet;
  protected readonly allowedMainStats: StatType[] = [
    StatType.PercentATK,
    StatType.PercentDEF,
    StatType.PercentHP,
    StatType.ElementalMastery,
    StatType.PhysicalDmgBonus,
    StatType.PyroDmgBonus,
    StatType.HydroDmgBonus,
    StatType.AnemoDmgBonus,
    StatType.ElectroDmgBonus,
    StatType.DendroDmgBonus,
    StatType.CryoDmgBonus,
    StatType.GeoDmgBonus,
  ];
}