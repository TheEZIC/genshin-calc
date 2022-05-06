import "reflect-metadata";

import Roster from "@/Roster/Roster";
import DamageCalculator from "@/Roster/DamageCalculator";
import ElementalReactionManager from "@/ElementalReactions/ElementalReactionManager";
import CombatLogger from "@/CombatLogger/CombatLogger";

import Ayaka from "@/Lists/Charaters/Ayaka/Ayaka";
import ArtifactCirclet from "@/Artifacts/Type/ArtifactCirclet";
import ArtifactFlower from "@/Artifacts/Type/ArtifactFlower";
import ArtifactGoblet from "@/Artifacts/Type/ArtifactGoblet";
import ArtifactPlume from "@/Artifacts/Type/ArtifactPlume";
import ArtifactSands from "@/Artifacts/Type/ArtifactSands";
import Stat from "@/BaseStats/Stat";
import { StatType } from "@/BaseStats/StatType";

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
import XianglingElemental from "@/Lists/Charaters/Xiangling/Skills/XianglingElemental";
import XianglingBurst from "@/Lists/Charaters/Xiangling/Skills/XianglingBurst";
import {CombatLoggerEffectsCollection, CombatLoggerReactionsCollection} from "@/CombatLogger/LoggerItemTypeCollections";
import Xiangling from "@/Lists/Charaters/Xiangling/Xiangling";
import EnergyManager from "@/Roster/EnergyManager";
import AyakaA4 from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaA4";
import SingletonsManager from "@/Singletons/SingletonsManager";
import CharactersFactory from "@/Factories/CharactersFactory";

const singletonManager = SingletonsManager.instance;

class GenshinCalculator {
  public characters: CharactersFactory = CharactersFactory.instance;

  public roster: Roster = Roster.instance;
  public damageCalculator: DamageCalculator = DamageCalculator.instance;
  public elementalReactionManager: ElementalReactionManager = ElementalReactionManager.instance;
  public energyManager: EnergyManager = EnergyManager.instance;

  public combatLogger = new CombatLogger();

  public test() {
    const ayaka = new Ayaka();
    const xiangling = new Xiangling();

    this.roster.addCharacter(ayaka);
    this.roster.addCharacter(xiangling);

    this.roster.changeActiveCharacter(ayaka);

    // const plume = new ArtifactPlume()
    //   .setMainStat(new Stat(StatType.FlatATK, 300))
    //   .addSubStat(new Stat(StatType.CritDamage, 35))
    //   .addSubStat(new Stat(StatType.CritChance, 8))
    //   .addSubStat(new Stat(StatType.PercentATK, 10))
    //   //.addSetBonus(new TroupeSet());
    //
    // const goblet = new ArtifactGoblet()
    //   .setMainStat(new Stat(StatType.CryoDmgBonus, 44))
    //   .addSetBonus(new TroupeSet());
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
    // ayaka.artifactsManager
    //   .add(plume)
    //   .add(goblet)
    //   .add(sands)
    //   .add(circlet)
    //   .add(flower);

    ayaka.baseStats.applyLvl(90);
    //ayaka.weaponManager.setWeapon(new WolfGravestoneWeapon().applyLvl(90));
    ayaka.weaponManager.changeRefinement(1);

    ayaka.constellationsManager.activateConstellation(3);

    ayaka.skillManager.changeLvl(10, SkillType.NormalAttack);
    ayaka.skillManager.changeLvl(10, SkillType.HoldAttack);
    ayaka.skillManager.changeLvl(10, SkillType.Burst);

    xiangling.baseStats.applyLvl(90);
    //xiangling.weaponManager.setWeapon(new WolfGravestoneWeapon().applyLvl(90));
    xiangling.skillManager.changeLvl(10, SkillType.Burst);

    this.roster.addEnemy(new Enemy());

    const rotation = () => {
      const dmg = this.damageCalculator.calcRotation([
        new AyakaBurst(),
        new AyakaElemental(),
        new XianglingBurst(),
        new XianglingElemental(),
        new AyakaA1(),
        new AyakaA2(),
        new AyakaHoldAttack(),
        new AyakaDash(),
      ]);

      this.combatLogger.clear();
      console.log(dmg);
    }

    rotation();
    rotation();
    rotation();
    rotation();
    rotation();
    rotation();

    this.roster.clearCharacters();
  }
}

new GenshinCalculator().test();

export {GenshinCalculator};
