import Character from "../Character";
import MainStat from "./MainStat";
import AtkStat from "./List/AtkStat";
import DefStat from "./List/DefStat";
import HpStat from "./List/HpStat";

export default class CalculatorStats {
  constructor(
    public character: Character,
  ) {
  }

  public ATK: MainStat = new AtkStat(this);
  public DEF: MainStat = new DefStat(this);
  public HP: MainStat = new HpStat(this);
}