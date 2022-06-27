import Enemy from "@/Entities/Enemies/Enemy";
import {DefReductionStat} from "@/Entities/Enemies/CalculatorStats/List/Def/DefReductionStat";
import {DefShredStat} from "@/Entities/Enemies/CalculatorStats/List/Def/DefShredStat";
import PhysicalResistanceStat from "@/Entities/Enemies/CalculatorStats/List/Resistance/PhysicalResistanceStat";
import PyroResistanceStat from "@/Entities/Enemies/CalculatorStats/List/Resistance/PyroResistanceStat";
import DendroResistanceStat from "@/Entities/Enemies/CalculatorStats/List/Resistance/CryoResistanceStat";
import ElectroResistanceStat from "@/Entities/Enemies/CalculatorStats/List/Resistance/ElectroResistanceStat";
import AnemoResistanceStat from "@/Entities/Enemies/CalculatorStats/List/Resistance/AnemoResistanceStat";
import GeoResistanceStat from "@/Entities/Enemies/CalculatorStats/List/Resistance/GeoResistanceStat";
import CryoResistanceStat from "@/Entities/Enemies/CalculatorStats/List/Resistance/CryoResistanceStat";

export default class EnemyCalculatorStats {
  constructor(private enemy: Enemy) {}

  public readonly defReduction = new DefReductionStat(this.enemy);
  public readonly defShred = new DefShredStat(this.enemy);

  public readonly physicalResistance = new PhysicalResistanceStat(this.enemy);
  public readonly pyroResistance = new PyroResistanceStat(this.enemy);
  public readonly dendroResistance = new DendroResistanceStat(this.enemy);
  public readonly hydroResistance = new DendroResistanceStat(this.enemy);
  public readonly electroResistance = new ElectroResistanceStat(this.enemy);
  public readonly anemoResistance = new AnemoResistanceStat(this.enemy);
  public readonly cryoResistance = new CryoResistanceStat(this.enemy);
  public readonly geoResistance = new GeoResistanceStat(this.enemy);
}
