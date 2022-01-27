import ArtifactCirclet from "@/Artifacts/Type/ArtifactCirclet";
import ArtifactFlower from "@/Artifacts/Type/ArtifactFlower";
import ArtifactGoblet from "@/Artifacts/Type/ArtifactGoblet";
import ArtifactPlume from "@/Artifacts/Type/ArtifactPlume";
import ArtifactSands from "@/Artifacts/Type/ArtifactSands";
import Stat from "@/BaseStats/Stat";
import { StatType } from "@/BaseStats/StatType";

import Roster from "@/Roster/Roster";
import "./paths";
import Ayaka from "@/Lists/Charaters/Ayaka/Ayaka";
import TroupeSet from "@/Lists/ArtifactsSets/TroupeSet";
import GladiatorSet from "@/Lists/ArtifactsSets/GladiatorSet";
import WolfGravestoneWeapon from "@/Lists/Weapons/Claymores/WolfGravestoneWeapon";
import AyakaBurst from "@/Lists/Charaters/Ayaka/Skills/AyakaBurst";
import AyakaElemental from "@/Lists/Charaters/Ayaka/Skills/AyakaElemental";
import AyakaDash from "@/Lists/Charaters/Ayaka/Skills/AyakaDash";
import AyakaA1 from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaA1";
import AyakaA2 from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaA2";
import AyakaA3 from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaA3";
import AyakaA4 from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaA4";
import AyakaA5 from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaA5";
import {SkillType} from "@/Skills/SkillType";
import AyakaHoldAttack from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaHoldAttack";

const roster = new Roster();
roster.addCharacter(new Ayaka());

const char = roster.currentCharacter;

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

char.skillManager.changeLvl(10, SkillType.NormalAttack);
char.skillManager.changeLvl(10, SkillType.HoldAttack);
char.skillManager.changeLvl(10, SkillType.Burst);

roster.addEnemy();
// roster.addEnemy();
// roster.addEnemy();

const dmg = roster.timeline.calcRotation([
  new AyakaBurst(),
  //new AyakaElemental(),
  new AyakaDash(),
  new AyakaDash(),
  new AyakaA1(),
  new AyakaA2(),
  new AyakaHoldAttack(),
]);

console.log(dmg)
