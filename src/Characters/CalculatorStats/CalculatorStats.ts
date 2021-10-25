import Character from "../Character";
import MainStat from "./Types/MainStat";
import AtkStat from "./List/AtkStat";
import DefStat from "./List/DefStat";
import HpStat from "./List/HpStat";
import ElementaryMasteryStat from "./List/ElementaryMasteryStat";
import EnergyRechargeStat from "./List/EnergyRechargeStat";
import CritChanceStat from "./List/CritChanceStat";
import CritDamageStat from "./List/CritDamageStat";
import PhysicalDmgBonusStat from "./List/PhysicalDmgBonusStat";
import PyroDmgBonusStat from "./List/PyroDmgBonusStat";
import HydroDmgBonusStat from "./List/HydroDmgBonusStat";
import AnemoDmgBonusStat from "./List/AnemoDmgBonusStat";
import ElectroDmgBonusStat from "./List/ElectroDmgBonusStat";
import DendroDmgBonusStat from "./List/DendroDmgBonusStat";
import CryoDmgBonusStat from "./List/CryoDmgBonusStat";
import GeoDmgBonusStat from "./List/GeoDmgBonusStat";
import HydroResistanceStat from "./List/HydroResistanceStat";
import PyroResistanceStat from "./List/PyroResistanceStat";
import PhysicalResistanceStat from "./List/PhysicalResistanceStat";
import ElectroResistanceStat from "./List/ElectroResistanceStat";
import AnemoResistanceStat from "./List/AnemoResistanceStat";
import DendroResistanceStat from "./List/DendroResistanceStat";
import CryoResistanceStat from "./List/CryoResistanceStat";
import GeoResistanceStat from "./List/GeoResistanceStat";

export default class CalculatorStats {
  constructor(
    public character: Character,
  ) {
  }

  public readonly ATK: MainStat = new AtkStat(this);
  public readonly DEF: MainStat = new DefStat(this);
  public readonly HP: MainStat = new HpStat(this);

  public readonly elementalMastery = new ElementaryMasteryStat(this);
  public readonly energyRecharge = new EnergyRechargeStat(this);

  public readonly critChance = new CritChanceStat(this);
  public readonly critDamage = new CritDamageStat(this);

  public readonly physicalDmgBonus = new PhysicalDmgBonusStat(this);
  public readonly pyroDmgBonus = new PyroDmgBonusStat(this);
  public readonly hydroDmgBonus = new HydroDmgBonusStat(this);
  public readonly anemoDmgBonus = new AnemoDmgBonusStat(this);
  public readonly electroDmgBonus = new ElectroDmgBonusStat(this);
  public readonly dendroDmgBonus = new DendroDmgBonusStat(this);
  public readonly cryoDmgBonus = new CryoDmgBonusStat(this);
  public readonly geoDmgBonus = new GeoDmgBonusStat(this);

  public readonly physicalResistance = new PhysicalResistanceStat(this);
  public readonly pyroResistance = new PyroResistanceStat(this);
  public readonly hydroResistance = new HydroResistanceStat(this);
  public readonly anemoResistance = new AnemoResistanceStat(this);
  public readonly electroResistance = new ElectroResistanceStat(this);
  public readonly dendroResistance = new DendroResistanceStat(this);
  public readonly cryoResistance = new CryoResistanceStat(this);
  public readonly geoResistance = new GeoResistanceStat(this);
}