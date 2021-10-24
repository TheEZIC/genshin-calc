import {ArtifactStatType} from "./ArtifactStatType";

export default class ArtifactStat {
  constructor(
    public type: ArtifactStatType,
    public value: number,
  ) {
  }
}