import Artifact from "@/Artifacts/Artifact";
import { ArtifactType } from "@/Artifacts/ArtifactType";
import { AllStatsType, StatType } from "@/BaseStats/StatType";

export default class ArtifactCirclet extends Artifact {
  public readonly type: ArtifactType = ArtifactType.Circlet;
  protected readonly allowedMainStats: StatType[] = [
    StatType.PercentATK,
    StatType.PercentDEF,
    StatType.PercentHP,
    StatType.ElementalMastery,
    StatType.CritChance,
    StatType.CritDamage
  ];
}
