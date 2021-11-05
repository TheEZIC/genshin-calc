import Artifact from "@/Artifacts/Artifact";
import { ArtifactType } from "@/Artifacts/ArtifactType";
import { AllStatsType, StatType } from "@/BaseStats/StatType";

export default class ArtifactPlume extends Artifact {
  public readonly type: ArtifactType = ArtifactType.Plume;
  protected readonly allowedMainStats: StatType[] = [StatType.FlatATK];
}
