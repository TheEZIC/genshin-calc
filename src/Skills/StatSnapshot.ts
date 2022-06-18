import Snapshot from "@/Snapshots/Snapshot";
import Stat from "@/Entities/Characters/CalculatorStats/Types/Stat";
import {StatTense} from "@/Entities/Characters/CalculatorStats/Types/StatController";
import {SkillType} from "@/Skills/SkillType";

export interface ISkillSnapshotValues {
  pureDmg: number;
  presentDmg: number;
}

export default class StatSnapshot extends Snapshot<ISkillSnapshotValues> {
  public addStat(hash: string, stat: Stat, filter?: SkillType): void {
    const pureDmg = stat.calcPure();
    const presentDmg = stat.calc(filter, [StatTense.Present]);

    console.log(pureDmg, presentDmg);

    this.add({hash, value: {pureDmg, presentDmg}});
  }

  public calcStat(hash: string, stat: Stat, filter?: SkillType) {
    const item = this.get(hash);
    if (!item) return 0;

    const {pureDmg, presentDmg} = item.value;
    const dynamicDmg = stat.calc(filter, [StatTense.Pre]);

    const presentPercent = presentDmg / pureDmg;
    const dynamicPercent = dynamicDmg / pureDmg;

    return pureDmg * presentPercent * dynamicPercent;
  }
}
