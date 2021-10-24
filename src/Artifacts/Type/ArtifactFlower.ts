import Artifact from "../Artifact";
import {ArtifactAllStats, ArtifactStatType} from "../ArtifactStatType";
import {ArtifactType} from "../ArtifactType";

export default class ArtifactFlower extends Artifact {
  public readonly type: ArtifactType = ArtifactType.Flower;
  protected readonly allowedMainStats: ArtifactStatType[] = [ArtifactStatType.FlatHP];
}