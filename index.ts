import Noelle from "./src/Characters/List/Noelle/Noelle";
import ArtifactCirclet from "./src/Artifacts/Type/ArtifactCirclet";
import {StatType} from "./src/BaseStats/StatType";
import GladiatorSet from "./src/Artifacts/Sets/GladiatorSet";
import ArtifactFlower from "./src/Artifacts/Type/ArtifactFlower";
import ArtifactPlume from "./src/Artifacts/Type/ArtifactPlume";
import TroupeSet from "./src/Artifacts/Sets/TroupeSet";
import ArtifactGoblet from "./src/Artifacts/Type/ArtifactGoblet";
import ArtifactSands from "./src/Artifacts/Type/ArtifactSands";
import Stat from "./src/BaseStats/Stat";
import WolfGravestoneWeapon from "./src/Weapons/List/Claymores/WolfGravestoneWeapon";
import Ayaka from "./src/Characters/List/Ayaka/Ayaka";
import AyakaA1 from "./src/Characters/List/Ayaka/Skills/Attacks/AyakaA1";
import AyakaA2 from "./src/Characters/List/Ayaka/Skills/Attacks/AyakaA2";
import AyakaA3 from "./src/Characters/List/Ayaka/Skills/Attacks/AyakaA3";
import AyakaA4 from "./src/Characters/List/Ayaka/Skills/Attacks/AyakaA4";
import AyakaA5 from "./src/Characters/List/Ayaka/Skills/Attacks/AyakaA5";
import AyakaBurst from "./src/Characters/List/Ayaka/Skills/AyakaBurst";
import AyakaElemental from "./src/Characters/List/Ayaka/Skills/AyakaElemental";

const char = new Ayaka();
const plume = new ArtifactPlume()
  .setMainStat(new Stat(StatType.FlatATK, 300))
  .addSubStat(new Stat(StatType.CritDamage, 35))
  .addSubStat(new Stat(StatType.CritChance, 8))
  .addSubStat(new Stat(StatType.PercentATK, 10))
  .addSetBonus(new TroupeSet());

const goblet = new ArtifactGoblet()
  .setMainStat(new Stat(StatType.GeoDmgBonus, 44))
  .addSetBonus(new TroupeSet());

const sands = new ArtifactSands()
  .setMainStat(new Stat(StatType.PercentATK, 40))
  .addSetBonus(new GladiatorSet());

const circlet = new ArtifactCirclet()
  .setMainStat(new Stat(StatType.CritChance, 30))
  .addSetBonus(new GladiatorSet());

const flower = new ArtifactFlower()
  .setMainStat(new Stat(StatType.FlatHP, 3000))
  .addSetBonus(new GladiatorSet());

char.artifactsManager
  .add(plume)
  .add(goblet)
  .add(sands)
  .add(circlet)
  .add(flower);

char.baseStats.applyLvl(90);
char.weaponManager.setWeapon(new WolfGravestoneWeapon().applyLvl(90));
char.weaponManager.changeRefinement(1);

const dmg = char.skillManager.calcRotation([
  new AyakaA1(),
  new AyakaA2(),
  new AyakaA3(),
  new AyakaA4(),
  new AyakaA5(),
  new AyakaElemental(),
  new AyakaBurst(),
]);

console.log(dmg);