import "reflect-metadata";
import { parseDependencyTree, parseCircular, prettyCircular } from 'dpdm';

import Roster from "@/Roster/Roster";
import EnergyManager from "@/Roster/EnergyManager";
import DamageCalculator from "@/Roster/DamageCalculator";
import ElementalReactionManager from "@/ElementalReactions/ElementalReactionManager";
import {container} from "./inversify.config";

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

parseDependencyTree('./index', {
  /* options, see below */
}).then((tree) => {
  const circulars = parseCircular(tree);
  console.log(prettyCircular(circulars));
});

const roster: Roster = container.get("Roster");
const damageCalculator: DamageCalculator = container.get("DamageCalculator");
const elementalReactionManager: ElementalReactionManager = container.get("ElementalReactionManager");
//const energyManager: EnergyManager = container.get("EnergyManager")

class GenshinCalculator {
  private roster: Roster = roster;
  private damageCalculator: DamageCalculator = damageCalculator;
  private elementalReactionManager: ElementalReactionManager = elementalReactionManager;

  public test() {
    this.roster!!.addCharacter(new Ayaka());

    const char = this.roster.activeCharacter;

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

    this.roster.addEnemy();
// this.roster.addEnemy();
// this.roster.addEnemy();

    const dmg = this.damageCalculator.calcRotation([
      new AyakaBurst(),
      new AyakaElemental(),
      new AyakaDash(),
      new AyakaDash(),
      new AyakaA1(),
      new AyakaA2(),
      new AyakaHoldAttack(),
    ]);

    console.log(dmg)
  }
}

new GenshinCalculator().test();

export {roster, damageCalculator, elementalReactionManager};
