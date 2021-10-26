import Noelle from "./src/Characters/List/Noelle/Noelle";
import ArtifactCirclet from "./src/Artifacts/Type/ArtifactCirclet";
import ArtifactStat from "./src/Artifacts/ArtifactStat";
import {ArtifactStatType} from "./src/Artifacts/ArtifactStatType";
import GladiatorSet from "./src/Artifacts/Sets/GladiatorSet";
import {ArtifactType} from "./src/Artifacts/ArtifactType";
import ArtifactFlower from "./src/Artifacts/Type/ArtifactFlower";
import ArtifactPlume from "./src/Artifacts/Type/ArtifactPlume";
import TroupeSet from "./src/Artifacts/Sets/TroupeSet";
import ArtifactGoblet from "./src/Artifacts/Type/ArtifactGoblet";
import ArtifactSands from "./src/Artifacts/Type/ArtifactSands";

const char = new Noelle();

const plume = new ArtifactPlume(new ArtifactStat(ArtifactStatType.FlatATK, 300))
  .addSetBonus(new TroupeSet());

const goblet = new ArtifactGoblet(new ArtifactStat(ArtifactStatType.GeoDmgBonus, 44))
  .addSetBonus(new TroupeSet());

const sands = new ArtifactSands(new ArtifactStat(ArtifactStatType.PercentATK, 40))
  .addSetBonus(new GladiatorSet());

const circlet = new ArtifactCirclet(new ArtifactStat(ArtifactStatType.CritChance, 30))
  .addSetBonus(new GladiatorSet());

const flower = new ArtifactFlower(new ArtifactStat(ArtifactStatType.FlatHP, 3000))
  .addSetBonus(new GladiatorSet());

char.artifacts
  .add(plume)
  .add(goblet)
  .add(sands)
  .add(circlet)
  .add(flower);

/*console.log(char.calculatorStats.ATK.prefixesSum);
console.log(char.calculatorStats.elementalMastery.additionalValuesSum);*/

char.artifacts.remove(ArtifactType.Flower);

console.log(char.calculatorStats.ATK.prefixesSum);
console.log(char.calculatorStats.elementalMastery.additionalValuesSum);

//console.log(char.artifacts.getStatSumByType(ArtifactStatType.CritDamage));