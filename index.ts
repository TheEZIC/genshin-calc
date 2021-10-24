import Noelle from "./src/Characters/List/Noelle/Noelle";
import ArtifactCirclet from "./src/Artifacts/Type/ArtifactCirclet";
import ArtifactStat from "./src/Artifacts/ArtifactStat";
import {ArtifactStatType} from "./src/Artifacts/ArtifactStatType";

const char = new Noelle();

const circlet = new ArtifactCirclet(new ArtifactStat(ArtifactStatType.CritChance, 30))
  .addSubStat(new ArtifactStat(ArtifactStatType.CritDamage, 24.2));

const flower = new ArtifactCirclet(new ArtifactStat(ArtifactStatType.FlatHP, 3000))
  .addSubStat(new ArtifactStat(ArtifactStatType.CritDamage, 35.6));

char.artifacts
  .add(circlet)
  .add(flower);

console.log(char.artifacts.getStatSumByType(ArtifactStatType.CritDamage));