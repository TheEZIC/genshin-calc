import Noelle from "./src/Characters/List/Noelle/Noelle";
import ArtifactCirclet from "./src/Artifacts/Type/ArtifactCirclet";
import ArtifactStat from "./src/Artifacts/ArtifactStat";
import {ArtifactStatType} from "./src/Artifacts/ArtifactStatType";
import GladiatorSet from "./src/Artifacts/Sets/GladiatorSet";
import {ArtifactType} from "./src/Artifacts/ArtifactType";
import ArtifactFlower from "./src/Artifacts/Type/ArtifactFlower";

const char = new Noelle();

const circlet = new ArtifactCirclet(new ArtifactStat(ArtifactStatType.CritChance, 30))
  .addSetBonus(new GladiatorSet())
  .addSubStat(new ArtifactStat(ArtifactStatType.CritDamage, 24.2));

const flower = new ArtifactFlower(new ArtifactStat(ArtifactStatType.FlatHP, 3000))
  .addSetBonus(new GladiatorSet())
  .addSubStat(new ArtifactStat(ArtifactStatType.CritDamage, 35.6));

char.artifacts
  .add(circlet)
  .add(flower);

console.log(char.calculatorStats.ATK.prefixesSum);

char.artifacts.remove(ArtifactType.Circlet);

console.log(char.calculatorStats.ATK.prefixesSum);

//console.log(char.artifacts.getStatSumByType(ArtifactStatType.CritDamage));