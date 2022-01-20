import Character from "@/Characters/Character";
import NormalSkill from "@/Skills/NormalSkill";
import SkillValue from "@/Skills/SkillValue";
import SkillStrategy from "@/Skills/SkillStrategy";
import DashSkillStrategy from "@/Skills/SkillStrategy/DashSkillStrategy";
import AyakaDashBuff from "@/Characters/List/Ayaka/Skills/Buffs/AyakaDashBuff";
import Effect from "@/Effects/Effect";
import {IWithInitializedEffects} from "@/Effects/IWithEffects";
import {ICalcDamageArgs} from "@/Skills/Skill";
import EffectManager from "@/Effects/EffectsManagers/EffectManager";

export default class AyakaDash extends NormalSkill implements IWithInitializedEffects<Character> {
  strategy: SkillStrategy = new DashSkillStrategy(this)
    .modify((strategy) => strategy.hasInfusion = true);

  frames: number = 20;
  protected value: SkillValue = new SkillValue(0, 0);

  public effectsToInitialize: Effect<Character>[] = [
    new AyakaDashBuff(),
  ];

  public override effectManager = new EffectManager(this.effectsToInitialize);

  public subscribeEffects(character: Character): void {
    const [ayakaDashBuff] = this.effectsToInitialize;
    character.listeners.DashSkillStarted.subscribe(ayakaDashBuff);
  }

  public unsubscribeEffects(character: Character): void {
    const [ayakaDashBuff] = this.effectsToInitialize;
    character.listeners.DashSkillStarted.unsubscribe(ayakaDashBuff);
  }

  protected override calcDamage({character}: ICalcDamageArgs): number {
    return 0;
  }
}
