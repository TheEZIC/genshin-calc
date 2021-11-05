import Artifact from "@/Artifacts/Artifact";
import { ArtifactType } from "@/Artifacts/ArtifactType";
import { AllStatsType, StatType } from "@/BaseStats/StatType";

export default class ArtifactFlower extends Artifact {
  public readonly type: ArtifactType = ArtifactType.Flower;
  protected readonly allowedMainStats: StatType[] = [StatType.FlatHP];
}
