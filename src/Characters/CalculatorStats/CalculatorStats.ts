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
}