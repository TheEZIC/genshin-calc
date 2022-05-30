import Character from "@/Entities/Characters/Character";

import AnemoDmgBonusStat from "./List/AnemoDmgBonusStat";
import AnemoResistanceStat from "./List/AnemoResistanceStat";
import AtkStat from "./List/AtkStat";
import CritChanceStat from "./List/CritChanceStat";
import CritDamageStat from "./List/CritDamageStat";
import CryoDmgBonusStat from "./List/CryoDmgBonusStat";
import CryoResistanceStat from "./List/CryoResistanceStat";
import DefStat from "./List/DefStat";
import DendroDmgBonusStat from "./List/DendroDmgBonusStat";
import DendroResistanceStat from "./List/DendroResistanceStat";
import ElectroDmgBonusStat from "./List/ElectroDmgBonusStat";
import ElectroResistanceStat from "./List/ElectroResistanceStat";
import ElementaryMasteryStat from "./List/ElementaryMasteryStat";
import EnergyRechargeStat from "./List/EnergyRechargeStat";
import GeoDmgBonusStat from "./List/GeoDmgBonusStat";
import GeoResistanceStat from "./List/GeoResistanceStat";
import HpStat from "./List/HpStat";
import HydroDmgBonusStat from "./List/HydroDmgBonusStat";
import HydroResistanceStat from "./List/HydroResistanceStat";
import PhysicalDmgBonusStat from "./List/PhysicalDmgBonusStat";
import PhysicalResistanceStat from "./List/PhysicalResistanceStat";
import PyroDmgBonusStat from "./List/PyroDmgBonusStat";
import PyroResistanceStat from "./List/PyroResistanceStat";
import MainStat from "./Types/MainStat";
import {VisionType} from "@/VisionType";
import ReactionDmgBonusStat from "@/Entities/Characters/CalculatorStats/ReactionDmgBonusStat";
import Stat from "@/Entities/Characters/CalculatorStats/Types/Stat";

export default class CalculatorStats {
  constructor(public character: Character) {}

  public readonly ATK: MainStat = new AtkStat(this.character);
  public readonly DEF: MainStat = new DefStat(this.character);
  public readonly HP: MainStat = new HpStat(this.character);

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

  public readonly vaporizeReactionDmgBonus = new ReactionDmgBonusStat(this.character);
  public readonly meltReactionDmgBonus = new ReactionDmgBonusStat(this.character);
  public readonly electroChargedReactionDmgBonus = new ReactionDmgBonusStat(this.character);
  public readonly frozenChargedReactionDmgBonus = new ReactionDmgBonusStat(this.character);
  public readonly overloadedChargedReactionDmgBonus = new ReactionDmgBonusStat(this.character);
  public readonly superConductChargedReactionDmgBonus = new ReactionDmgBonusStat(this.character);
  public readonly swirlChargedReactionDmgBonus = new ReactionDmgBonusStat(this.character);
  public readonly crystallizeChargedReactionDmgBonus = new ReactionDmgBonusStat(this.character);

  public notifyAll() {
    Object.entries(this).map(([key, value]) => {
      const isStat = value instanceof Stat;

      if (isStat) {
        const stat = value as Stat;
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
