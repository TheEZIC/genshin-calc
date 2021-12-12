import Character from "@/Characters/Character";
import NormalSkill from "@/Skills/NormalSkill";
import SkillValue from "@/Skills/SkillValue";
import SkillStrategy from "@/Skills/SkillStrategy";
import DashSkillStrategy from "@/Skills/SkillStrategy/DashSkillStrategy";
import AyakaDashBuff from "@/Characters/List/Ayaka/Skills/Buffs/AyakaDashBuff";
import Effect from "@/Buffs/Effect";
import {IWithEffects} from "@/Buffs/IWithEffects";
import EffectManager from "@/Buffs/EffectManager";

export default class AyakaDash extends NormalSkill implements IWithEffects {
  strategy: SkillStrategy = new DashSkillStrategy(this)
    .modify((strategy) => strategy.hasInfusion = true);

  frames: number = 20;
  protected value: SkillValue = new SkillValue(0, 0);

  public override buffManager = new EffectManager(this);

  public effects: Effect[] = [
    new AyakaDashBuff(),
  ]

  public initEffects(character: Character) {
    const [ayakaDashBuff] = this.effects;
    character.listeners.DashSkillStarted.subscribe(ayakaDashBuff);
  }

  public abortEffects(character: Character): void {
    const [ayakaDashBuff] = this.effects;
    character.listeners.DashSkillStarted.unsubscribe(ayakaDashBuff);
  }

  protected override calcDamage(character: Character): number {
    return 0;
  }
}
