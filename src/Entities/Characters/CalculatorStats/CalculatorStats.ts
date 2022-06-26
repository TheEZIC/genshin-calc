import Character from "@/Entities/Characters/Character";

import AnemoDmgBonusStat from "./List/ElementalDmgStats/AnemoDmgBonusStat";
import AnemoResistanceStat from "./List/ResistanceStats/AnemoResistanceStat";
import AtkStat from "./List/MainStats/AtkStat";
import CritChanceStat from "./List/CritStats/CritChanceStat";
import CritDamageStat from "./List/CritStats/CritDamageStat";
import CryoDmgBonusStat from "./List/ElementalDmgStats/CryoDmgBonusStat";
import CryoResistanceStat from "./List/ResistanceStats/CryoResistanceStat";
import DefStat from "./List/MainStats/DefStat";
import DendroDmgBonusStat from "./List/ElementalDmgStats/DendroDmgBonusStat";
import DendroResistanceStat from "./List/ResistanceStats/DendroResistanceStat";
import ElectroDmgBonusStat from "./List/ElementalDmgStats/ElectroDmgBonusStat";
import ElectroResistanceStat from "./List/ResistanceStats/ElectroResistanceStat";
import ElementaryMasteryStat from "./List/ElementaryMasteryStat";
import EnergyRechargeStat from "./List/EnergyRechargeStat";
import GeoDmgBonusStat from "./List/ElementalDmgStats/GeoDmgBonusStat";
import GeoResistanceStat from "./List/ResistanceStats/GeoResistanceStat";
import HpStat from "./List/MainStats/HpStat";
import HydroDmgBonusStat from "./List/ElementalDmgStats/HydroDmgBonusStat";
import HydroResistanceStat from "./List/ResistanceStats/HydroResistanceStat";
import PhysicalDmgBonusStat from "./List/ElementalDmgStats/PhysicalDmgBonusStat";
import PhysicalResistanceStat from "./List/ResistanceStats/PhysicalResistanceStat";
import PyroDmgBonusStat from "./List/ElementalDmgStats/PyroDmgBonusStat";
import PyroResistanceStat from "./List/ResistanceStats/PyroResistanceStat";
import {VisionType} from "@/VisionType";
import Stat from "@/CalculatorStats/Stat";
import VaporizeReactionDmgBonusStat
  from "@/Entities/Characters/CalculatorStats/List/ReactionDmgStats/VaporizeReactionDmgBonusStat";
import MeltReactionDmgBonusStat
  from "@/Entities/Characters/CalculatorStats/List/ReactionDmgStats/MeltReactionDmgBonusStat";
import ElectroChargedReactionDmgBonusStat
  from "@/Entities/Characters/CalculatorStats/List/ReactionDmgStats/ElectroChargedReactionDmgBonusStat";
import FrozenReactionDmgBonusStat
  from "@/Entities/Characters/CalculatorStats/List/ReactionDmgStats/FrozenReactionDmgBonusStat";
import OverloadedReactionDmgBonusStat
  from "@/Entities/Characters/CalculatorStats/List/ReactionDmgStats/OverloadedReactionDmgBonusStat";
import SuperConductReactionDmgBonusStat
  from "@/Entities/Characters/CalculatorStats/List/ReactionDmgStats/SuperConductReactionDmgBonusStat";
import SwirlReactionDmgBonus
  from "@/Entities/Characters/CalculatorStats/List/ReactionDmgStats/SwirlReactionDmgBonus";
import CrystallizeReactionDmgBonusStat
  from "@/Entities/Characters/CalculatorStats/List/ReactionDmgStats/CrystallizeReactionDmgBonusStat";
import CharacterStat from "@/Entities/Characters/CalculatorStats/Types/CharacterStat";
import CharacterMainStat from "@/Entities/Characters/CalculatorStats/Types/CharacterMainStat";

export default class CalculatorStats {
  constructor(public character: Character) {}

  public readonly ATK: CharacterMainStat = new AtkStat(this.character);
  public readonly DEF: CharacterMainStat = new DefStat(this.character);
  public readonly HP: CharacterMainStat = new HpStat(this.character);

  public readonly elementalMastery = new ElementaryMasteryStat(this.character);
  public readonly energyRecharge = new EnergyRechargeStat(this.character);

  public readonly critChance = new CritChanceStat(this.character);
  public readonly critDamage = new CritDamageStat(this.character);

  public readonly physicalDmgBonus = new PhysicalDmgBonusStat(this.character);
  public readonly pyroDmgBonus = new PyroDmgBonusStat(this.character);
  public readonly hydroDmgBonus = new HydroDmgBonusStat(this.character);
  public readonly anemoDmgBonus = new AnemoDmgBonusStat(this.character);
  public readonly electroDmgBonus = new ElectroDmgBonusStat(this.character);
  public readonly dendroDmgBonus = new DendroDmgBonusStat(this.character);
  public readonly cryoDmgBonus = new CryoDmgBonusStat(this.character);
  public readonly geoDmgBonus = new GeoDmgBonusStat(this.character);

  public readonly physicalResistance = new PhysicalResistanceStat(this.character);
  public readonly pyroResistance = new PyroResistanceStat(this.character);
  public readonly hydroResistance = new HydroResistanceStat(this.character);
  public readonly anemoResistance = new AnemoResistanceStat(this.character);
  public readonly electroResistance = new ElectroResistanceStat(this.character);
  public readonly dendroResistance = new DendroResistanceStat(this.character);
  public readonly cryoResistance = new CryoResistanceStat(this.character);
  public readonly geoResistance = new GeoResistanceStat(this.character);

  public readonly vaporizeReactionDmgBonus = new VaporizeReactionDmgBonusStat(this.character);
  public readonly meltReactionDmgBonus = new MeltReactionDmgBonusStat(this.character);
  public readonly electroChargedReactionDmgBonus = new ElectroChargedReactionDmgBonusStat(this.character);
  public readonly frozenReactionDmgBonus = new FrozenReactionDmgBonusStat(this.character);
  public readonly overloadedReactionDmgBonus = new OverloadedReactionDmgBonusStat(this.character);
  public readonly superConductReactionDmgBonus = new SuperConductReactionDmgBonusStat(this.character);
  public readonly swirlReactionDmgBonus = new SwirlReactionDmgBonus(this.character);
  public readonly crystallizeReactionDmgBonus = new CrystallizeReactionDmgBonusStat(this.character);

  private _list: CharacterStat[] = [
    this.ATK,
    this.HP,
    this.DEF,

    this.elementalMastery,
    this.energyRecharge,

    this.critChance,
    this.critDamage,

    this.physicalDmgBonus,
    this.pyroDmgBonus,
    this.hydroDmgBonus,
    this.anemoDmgBonus,
    this.electroDmgBonus,
    this.dendroDmgBonus,
    this.cryoDmgBonus,
    this.geoDmgBonus,

    this.physicalResistance,
    this.pyroResistance,
    this.hydroResistance,
    this.anemoResistance,
    this.electroResistance,
    this.dendroResistance,
    this.cryoResistance,
    this.geoResistance,

    this.vaporizeReactionDmgBonus,
    this.meltReactionDmgBonus,
    this.electroChargedReactionDmgBonus,
    this.frozenReactionDmgBonus,
    this.overloadedReactionDmgBonus,
    this.superConductReactionDmgBonus,
    this.swirlReactionDmgBonus,
    this.crystallizeReactionDmgBonus,
  ];

  public get list() {
    return this._list;
  }

  public findByName(name: string) {
    this._list.find(stat => stat.title === name);
  }

  public notifyAll() {
    Object.entries(this).map(([key, value]) => {
      const isStat = value instanceof Stat;

      if (isStat) {
        const stat = value as CharacterStat;
        stat.onChange.notifyAll(stat.calc());
      }
    });
  }

  public getElementalDmgBonus(visionType: VisionType): number {
    switch (visionType) {
      case VisionType.Anemo:
        return this.anemoDmgBonus.calc();
      case VisionType.Cryo:
        return this.cryoDmgBonus.calc();
      case VisionType.Dendro:
        return this.dendroDmgBonus.calc();
      case VisionType.Electro:
        return this.electroDmgBonus.calc();
      case VisionType.Geo:
        return this.geoDmgBonus.calc();
      case VisionType.Hydro:
        return this.hydroDmgBonus.calc();
      default:
        return 0;
    }
  }

  public getPhysicalDmgBonus(): number {
    return this.physicalDmgBonus.calc();
  }
}
