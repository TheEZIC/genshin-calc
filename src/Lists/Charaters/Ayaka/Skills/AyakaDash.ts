import Character from "@/Entities/Characters/Character";
import NormalSkill from "@/Skills/NormalSkill";
import SkillValue from "@/Skills/SkillValue";
import SkillStrategy from "@/Skills/SkillStrategy";
import DashSkillStrategy from "@/Skills/SkillStrategy/DashSkillStrategy";
import Effect from "@/Effects/Effect";
import {IWithInitializedEffects} from "@/Effects/IWithEffects";
import {ICalcDamageArgs} from "@/Skills/Skill";
import EffectManager from "@/Effects/EffectsManagers/EffectManager";
import {SkillTargetType} from "@/Skills/SkillTargetType";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import AyakaDashBuff from "@/Lists/Charaters/Ayaka/Skills/Buffs/AyakaDashBuff";

export default class AyakaDash extends NormalSkill implements IWithInitializedEffects<Character> {
  strategy: SkillStrategy = new DashSkillStrategy(this)
    .modify((strategy) => strategy.hasInfusion = true);

  frames: number = 20;
  countdownFrames: number = 0;
  protected value: SkillValue = new SkillValue(0, 0);

  targetType: SkillTargetType = SkillTargetType.AOE;
  damageRegistrationType: SkillDamageRegistrationType = SkillDamageRegistrationType.Adaptive;

  public effectsToInitialize: Effect<Character>[] = [
    new AyakaDashBuff(),
  ];

  public override effectManager = new EffectManager(this.effectsToInitialize);

  public subscribeEffects(character: Character): void {
    const [ayakaDashBuff] = this.effectsToInitialize;
    character.listeners.DashSkillEnded.subscribe(ayakaDashBuff);
  }

  public unsubscribeEffects(character: Character): void {
    const [ayakaDashBuff] = this.effectsToInitialize;
    character.listeners.DashSkillEnded.unsubscribe(ayakaDashBuff);
  }

  protected override calcDamage({character}: ICalcDamageArgs): number {
    return 0;
  }
}
