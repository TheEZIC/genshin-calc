import Character from "@/Characters/Character";
import NormalSkill from "@/Skills/NormalSkill";
import SkillValue from "@/Skills/SkillValue";
import SkillStrategy from "@/Skills/SkillStrategy";
import DashSkillStrategy from "@/Skills/SkillStrategy/DashSkillStrategy";
import AyakaDashBuff from "@/Characters/List/Ayaka/Skills/Buffs/AyakaDashBuff";
import SkillsManager from "@/Skills/SkillsManager";
import Buff from "@/Buffs/Buff";

export default class AyakaDash extends NormalSkill {
  strategy: SkillStrategy = new DashSkillStrategy(this)
    .modify((strategy) => strategy.hasInfusion = true);

  frames: number = 20;
  protected value: SkillValue = new SkillValue(0, 0);

  protected override _buffs: Buff[] = [
    new AyakaDashBuff(),
  ]

  public override initBuffs(skillManager: SkillsManager) {
    super.initBuffs(skillManager);
    const [ayakaDashBuff] = this._buffs;

    skillManager.listeners.DashSkillStarted.subscribe(ayakaDashBuff);
  }

  protected override calcDamage(character: Character): number {
    return 0;
  }
}