import DamageCalculator from "@/Roster/DamageCalculator";
import Ayaka from "@/Lists/Charaters/Ayaka/Ayaka";
import Xiangling from "@/Lists/Charaters/Xiangling/Xiangling";
import ArtifactGoblet from "@/Artifacts/Type/ArtifactGoblet";
import Stat from "@/BaseStats/Stat";
import {StatType} from "@/BaseStats/StatType";
import TroupeSet from "@/Lists/ArtifactsSets/TroupeSet";
import {SkillType} from "@/Skills/SkillType";
import LithicSpear from "@/Lists/Weapons/Polearms/BlackcliffPole";
import Enemy from "@/Entities/Enemies/Enemy";
import XianglingNormalAttack from "@/Lists/Charaters/Xiangling/Skills/Attacks/XianglingNormalAttack";
import XianglingHoldAttack from "@/Lists/Charaters/Xiangling/Skills/Attacks/XianglingHoldAttack";
import {
  CombatLoggerActionsCollection,
  CombatLoggerEffectsCollection,
  CombatLoggerSkillsCollection
} from "@/CombatLogger/LoggerItemTypeCollections";
import AyakaBurst from "./Lists/Charaters/Ayaka/Skills/AyakaBurst";
import AyakaElemental from "./Lists/Charaters/Ayaka/Skills/AyakaElemental";
import AyakaNormalAttack from "./Lists/Charaters/Ayaka/Skills/Attacks/AyakaNormalAttack";
import XianglingBurst from "./Lists/Charaters/Xiangling/Skills/XianglingBurst";
import XianglingElemental from "./Lists/Charaters/Xiangling/Skills/XianglingElemental";
import AyakaDash from "./Lists/Charaters/Ayaka/Skills/AyakaDash";
import AyakaHoldAttack from "./Lists/Charaters/Ayaka/Skills/Attacks/AyakaHoldAttack";

const rotation = () => {
  const damageCalculator = new DamageCalculator();
  const roster = damageCalculator.roster;
  const ayaka = new Ayaka();
  const xiangling = new Xiangling();

  roster.addCharacter(ayaka);
  roster.addCharacter(xiangling);

  roster.changeActiveCharacter(ayaka);

  // const plume = new ArtifactPlume()
  //   .setMainStat(new Stat(StatType.FlatATK, 300))
  //   .addSubStat(new Stat(StatType.CritDamage, 35))
  //   .addSubStat(new Stat(StatType.CritChance, 8))
  //   .addSubStat(new Stat(StatType.PercentATK, 10))
  //   //.addSetBonus(new TroupeSet());
  //

  const goblet = new ArtifactGoblet()
    .setMainStat(new Stat(StatType.CryoDmgBonus, 44))
    .addSetBonus(new TroupeSet());

  //
  // const sands = new ArtifactSands()
  //   .setMainStat(new Stat(StatType.PercentATK, 40))
  //   .addSetBonus(new GladiatorSet());
  //
  // const circlet = new ArtifactCirclet()
  //   .setMainStat(new Stat(StatType.CritChance, 30))
  //   .addSetBonus(new GladiatorSet());
  //
  // const flower = new ArtifactFlower()
  //   .setMainStat(new Stat(StatType.FlatHP, 3000))
  //   .addSetBonus(new GladiatorSet());
  //
  ayaka.artifactsManager
  // .add(plume)
  // .add(goblet)
  // .add(sands)
  // .add(circlet)
  // .add(flower);

  ayaka.applyLvl(90);
  //ayaka.weaponManager.setWeapon(new WolfGravestoneWeapon().applyLvl(90));
  //ayaka.weaponManager.changeRefinement(1);

  console.log(ayaka.calculatorStats.ATK.calcDisplayed(), "displayed stat");

  ayaka.constellationsManager.activateConstellation(4);

  ayaka.skillManager.changeLvl(10, SkillType.NormalAttack);
  ayaka.skillManager.changeLvl(10, SkillType.HoldAttack);
  ayaka.skillManager.changeLvl(10, SkillType.Burst);

  xiangling.applyLvl(81);
  xiangling.weaponManager.setWeapon(new LithicSpear().applyLvl(1));
  xiangling.skillManager.changeLvl(8, SkillType.Elemental);
  xiangling.skillManager.changeLvl(10, SkillType.Burst);

  roster.addEnemy(new Enemy().applyLvl(80));
  //roster.addEnemy(new Enemy());

  const dmg = damageCalculator.calcRotationAndFinish([
    new XianglingNormalAttack(),
    new XianglingNormalAttack(),
    new XianglingNormalAttack(),
    new XianglingNormalAttack(),
    new XianglingHoldAttack(),
    new AyakaBurst(),
    new AyakaElemental(),
    new AyakaNormalAttack(),
    new AyakaNormalAttack(),
    new XianglingBurst(),
    new XianglingElemental(),
    new AyakaHoldAttack(),
    new AyakaDash(),
    new AyakaDash(),
    new AyakaDash(),
    new AyakaNormalAttack(),
    new AyakaDash(),
    new AyakaNormalAttack(),
    new AyakaNormalAttack(),
    new AyakaNormalAttack(),
  ]);

  const logs = damageCalculator.combatLogger.getFilteredLogs([
    ...CombatLoggerEffectsCollection,
    ...CombatLoggerSkillsCollection,
    ...CombatLoggerActionsCollection,
    // ...CombatLoggerReactionsCollection,
  ]);

  console.log(logs);

  damageCalculator.combatLogger.save();
  damageCalculator.combatLogger.clear();
  console.log(dmg);
}

rotation();
// rotation();
// rotation();
// rotation();
// rotation();
// rotation();
