import "reflect-metadata";

import Roster from "@/Roster/Roster";
import DamageCalculator from "@/Roster/DamageCalculator";
import ElementalReactionManager from "@/ElementalReactions/ElementalReactionManager";
import CombatLogger from "@/CombatLogger/CombatLogger";
import {container, ContainerBindings} from "./inversify.config";

import Ayaka from "@/Lists/Charaters/Ayaka/Ayaka";
import ArtifactCirclet from "@/Artifacts/Type/ArtifactCirclet";
import ArtifactFlower from "@/Artifacts/Type/ArtifactFlower";
import ArtifactGoblet from "@/Artifacts/Type/ArtifactGoblet";
import ArtifactPlume from "@/Artifacts/Type/ArtifactPlume";
import ArtifactSands from "@/Artifacts/Type/ArtifactSands";
import Stat from "@/BaseStats/Stat";
import { StatType } from "@/BaseStats/StatType";

import "./paths";

import TroupeSet from "@/Lists/ArtifactsSets/TroupeSet";
import GladiatorSet from "@/Lists/ArtifactsSets/GladiatorSet";
import WolfGravestoneWeapon from "@/Lists/Weapons/Claymores/WolfGravestoneWeapon";
import AyakaBurst from "@/Lists/Charaters/Ayaka/Skills/AyakaBurst";
import AyakaElemental from "@/Lists/Charaters/Ayaka/Skills/AyakaElemental";
import AyakaDash from "@/Lists/Charaters/Ayaka/Skills/AyakaDash";
import AyakaA1 from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaA1";
import AyakaA2 from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaA2";
import {SkillType} from "@/Skills/SkillType";
import AyakaHoldAttack from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaHoldAttack";
import Enemy from "@/Entities/Enemies/Enemy";
import CharactersFactory from "@/Entities/Characters/CharactersFactory";
import XianglingElemental from "@/Lists/Charaters/Xiangling/Skills/XianglingElemental";
import XianglingBurst from "@/Lists/Charaters/Xiangling/Skills/XianglingBurst";
import {CombatLoggerEffectsCollection, CombatLoggerReactionsCollection} from "@/CombatLogger/LoggerItemTypeCollections";

const roster: Roster = container.get(ContainerBindings.Roster);
const damageCalculator: DamageCalculator = container.get(ContainerBindings.DamageCalculator);
const elementalReactionManager: ElementalReactionManager = container.get(ContainerBindings.ElementalReactionManager);
//const energyManager: EnergyManager = container.get(ContainerBindings.EnergyManager)

const factory = new CharactersFactory();

class GenshinCalculator {
  private roster: Roster = roster;
  private damageCalculator: DamageCalculator = damageCalculator;
  private elementalReactionManager: ElementalReactionManager = elementalReactionManager;

  public combatLogger = new CombatLogger();

  public test() {
    const ayaka = factory.createByName("Ayaka")!!;
    const xiangling = factory.createByName("Xiangling")!!;

    this.roster.changeActiveCharacter(ayaka);

    const plume = new ArtifactPlume()
      .setMainStat(new Stat(StatType.FlatATK, 300))
      .addSubStat(new Stat(StatType.CritDamage, 35))
      .addSubStat(new Stat(StatType.CritChance, 8))
      .addSubStat(new Stat(StatType.PercentATK, 10))
      //.addSetBonus(new TroupeSet());

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

    ayaka.artifactsManager
      .add(plume)
      .add(goblet)
      .add(sands)
      .add(circlet)
      .add(flower);

    ayaka.baseStats.applyLvl(90);
    ayaka.weaponManager.setWeapon(new WolfGravestoneWeapon().applyLvl(90));
    ayaka.weaponManager.changeRefinement(1);

    ayaka.constellationsManager.activateConstellation(3);

    ayaka.skillManager.changeLvl(10, SkillType.NormalAttack);
    ayaka.skillManager.changeLvl(10, SkillType.HoldAttack);
    ayaka.skillManager.changeLvl(10, SkillType.Burst);

    xiangling.baseStats.applyLvl(90);
    xiangling.weaponManager.setWeapon(new WolfGravestoneWeapon().applyLvl(90));
    xiangling.skillManager.changeLvl(10, SkillType.Burst);

    this.roster.addEnemy(new Enemy());

    const dmg = this.damageCalculator.calcRotation([
      // new XianglingElemental(),
      //new XianglingBurst(),
      new AyakaBurst(),
      // new AyakaElemental(),
      // new AyakaElemental(),
      // new AyakaDash(),
      // new AyakaA1(),
      // new AyakaA2(),
      // new AyakaHoldAttack(),
    ]);

    console.log(dmg);
    console.log(this.combatLogger.getFilteredLogs([
      ...CombatLoggerEffectsCollection,
      //...CombatLoggerReactionsCollection,
    ]));
  }
}

new GenshinCalculator().test();

export {roster, damageCalculator, elementalReactionManager};
