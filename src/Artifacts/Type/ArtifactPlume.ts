import Artifact from "../Artifact";
import {AllStatsType, StatType} from "../../BaseStats/StatType";
import {ArtifactType} from "../ArtifactType";

export default class ArtifactPlume extends Artifact {
  public readonly type: ArtifactType = ArtifactType.Plume;
  protected readonly allowedMainStats: StatType[] = [StatType.FlatATK];
}