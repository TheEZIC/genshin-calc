import Artifact from "../Artifact";
import {AllStatsType, StatType} from "../../BaseStats/StatType";
import {ArtifactType} from "../ArtifactType";

export default class ArtifactFlower extends Artifact {
  public readonly type: ArtifactType = ArtifactType.Flower;
  protected readonly allowedMainStats: StatType[] = [StatType.FlatHP];
}