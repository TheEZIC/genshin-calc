import Artifact from "@/Artifacts/Artifact";
import { ArtifactType } from "@/Artifacts/ArtifactType";
import { StatType } from "@/BaseStats/StatType";

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
    StatType.GeoDmgBonus
  ];
}
