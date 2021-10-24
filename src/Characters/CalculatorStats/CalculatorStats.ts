import Character from "../Character";
import MainStat from "./Types/MainStat";
import AtkStat from "./List/AtkStat";
import DefStat from "./List/DefStat";
import HpStat from "./List/HpStat";
import ElementaryMasteryStat from "./List/ElementaryMasteryStat";
import EnergyRechargeStat from "./List/EnergyRechargeStat";
import CritChanceStat from "./List/CritChanceStat";
import CritDamageStat from "./List/CritDamageStat";

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
}