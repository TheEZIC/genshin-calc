import Noelle from "./src/Characters/List/Noelle/Noelle";
import ArtifactCirclet from "./src/Artifacts/Type/ArtifactCirclet";
import {StatType} from "./src/BaseStats/StatType";
import GladiatorSet from "./src/Artifacts/Sets/GladiatorSet";
import {ArtifactType} from "./src/Artifacts/ArtifactType";
import ArtifactFlower from "./src/Artifacts/Type/ArtifactFlower";
import ArtifactPlume from "./src/Artifacts/Type/ArtifactPlume";
import TroupeSet from "./src/Artifacts/Sets/TroupeSet";
import ArtifactGoblet from "./src/Artifacts/Type/ArtifactGoblet";
import ArtifactSands from "./src/Artifacts/Type/ArtifactSands";
import Stat from "./src/BaseStats/Stat";

const char = new Noelle();

const plume = new ArtifactPlume()
  .addMainStat(new Stat(StatType.FlatATK, 300))
  .addSetBonus(new TroupeSet());

const goblet = new ArtifactGoblet()
  .addMainStat(new Stat(StatType.GeoDmgBonus, 44))
  .addSetBonus(new TroupeSet());

const sands = new ArtifactSands()
  .addMainStat(new Stat(StatType.PercentATK, 40))
  .addSetBonus(new GladiatorSet());

const circlet = new ArtifactCirclet()
  .addMainStat(new Stat(StatType.CritChance, 30))
  .addSetBonus(new GladiatorSet());

const flower = new ArtifactFlower()
  .addMainStat(new Stat(StatType.FlatHP, 3000))
  .addSetBonus(new GladiatorSet());

char.artifactsManager
  .add(plume)
  .add(goblet)
  .add(sands)
  .add(circlet)
  .add(flower);

/*console.log(char.calculatorStats.ATK.prefixesSum);
console.log(char.calculatorStats.elementalMastery.additionalValuesSum);*/

char.artifactsManager.remove(ArtifactType.Flower);

console.log(char.calculatorStats.ATK.prefixesSum);
console.log(char.calculatorStats.elementalMastery.additionalValuesSum);

//console.log(char.artifacts.getStatSumByType(ArtifactStatType.CritDamage));