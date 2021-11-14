import GladiatorSet from "@/Artifacts/Sets/GladiatorSet";
import TroupeSet from "@/Artifacts/Sets/TroupeSet";
import ArtifactCirclet from "@/Artifacts/Type/ArtifactCirclet";
import ArtifactFlower from "@/Artifacts/Type/ArtifactFlower";
import ArtifactGoblet from "@/Artifacts/Type/ArtifactGoblet";
import ArtifactPlume from "@/Artifacts/Type/ArtifactPlume";
import ArtifactSands from "@/Artifacts/Type/ArtifactSands";
import Stat from "@/BaseStats/Stat";
import { StatType } from "@/BaseStats/StatType";
import Ayaka from "@/Characters/List/Ayaka/Ayaka";
import AyakaA1 from "@/Characters/List/Ayaka/Skills/Attacks/AyakaA1";
import AyakaA2 from "@/Characters/List/Ayaka/Skills/Attacks/AyakaA2";
import AyakaA3 from "@/Characters/List/Ayaka/Skills/Attacks/AyakaA3";
import AyakaA4 from "@/Characters/List/Ayaka/Skills/Attacks/AyakaA4";
import AyakaA5 from "@/Characters/List/Ayaka/Skills/Attacks/AyakaA5";
import AyakaBurst from "@/Characters/List/Ayaka/Skills/AyakaBurst";
import AyakaElemental from "@/Characters/List/Ayaka/Skills/AyakaElemental";
import { SkillType } from "@/Skills/SkillType";
import WolfGravestoneWeapon from "@/Weapons/List/Claymores/WolfGravestoneWeapon";

import "./paths";

const char = new Ayaka();
const plume = new ArtifactPlume()
  .setMainStat(new Stat(StatType.FlatATK, 300))
  .addSubStat(new Stat(StatType.CritDamage, 35))
  .addSubStat(new Stat(StatType.CritChance, 8))
  .addSubStat(new Stat(StatType.PercentATK, 10))
  .addSetBonus(new TroupeSet());

const goblet = new ArtifactGoblet()
  .setMainStat(new Stat(StatType.CryoDmgBonus, 44))
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

char.constellationsManager.activateConstellation(3);

char.skillManager.changeLvl(10, SkillType.Attack);
const dmg = char.skillManager.calcRotation([
  new AyakaBurst(),
  new AyakaA1(),
  new AyakaA2(),
  new AyakaA3(),
  new AyakaA4(),
  new AyakaA5(),
  new AyakaA1(),
  new AyakaA2(),
  new AyakaElemental()
]);

console.log(dmg);
