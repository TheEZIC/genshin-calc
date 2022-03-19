import Character from "@/Entities/Characters/Character";
import {StatValue} from "@/Entities/Characters/CalculatorStats/Types/StatValue";
import {ISkillStrategy} from "@/Skills/SkillStrategy";
import EffectManager from "@/Effects/EffectsManagers/EffectManager";
import {SkillTargetType} from "@/Skills/SkillTargetType";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import {isIDOTSkill} from "@/Skills/SkillInterfaces/IDOTSkill";
import ICD from "@/Skills/ICD";
import ElementalStatus from "@/ElementalStatuses/ElementalStatus";
import SkillLvl from "@/Skills/SkillLvl";
import {IBehaviorWithEvents} from "@/Behavior/IBehaviorWithEvents";
import SkillBehavior, {ISkillBehaviorArgs} from "@/Behavior/SkillBehavior";
import {convertGetDamageToCalcDamageArgs} from "@/Skills/SkillUtils";
import Roster from "@/Roster/Roster";
import {container, ContainerBindings} from "@/inversify.config";
import ElementalReactionManager from "@/ElementalReactions/ElementalReactionManager";
import EnergyManager from "@/Roster/EnergyManager";
import {IElementalReactionArgs} from "@/ElementalReactions/ElementalReaction";
import Entity from "@/Entities/Entity";
import GlobalListeners from "@/Roster/GlobalListeners";

export interface ICalcDamageArgs {
  character: Character;
  prevSkill?: Skill;
  nextSkill?: Skill;
  prevSkills: Skill[];
  nextSkills: Skill[];
  value: number;
}

export interface IGetDamageArgs {
  character: Character;
  skills: Skill[];
  currentSkillIndex: number;
  mvsCalcMode?: boolean;
}

export default abstract class Skill implements IBehaviorWithEvents<Skill, ISkillBehaviorArgs> {
  public abstract strategy: ISkillStrategy;

  public abstract frames: number;
  public abstract countdownFrames: number;

  public get timelineDurationFrames(): number {
    return this.frames;
  }

  public abstract targetType: SkillTargetType;
  public abstract damageRegistrationType: SkillDamageRegistrationType;

  public ICD: ICD | null = null;
  public elementalStatus: ElementalStatus | null = null;
  public effectManager: EffectManager<Character> | null = null;

  public lvl: SkillLvl = new SkillLvl(this);

  protected readonly ADD_ENERGY_FRAMES_DELAY: number = 100;

  public get name(): string {
    return this.constructor.name;
  }

  public isMVsMode: boolean = false;

  public abstract onAction(args: ICalcDamageArgs): void;

  protected roster: Roster = container.get(ContainerBindings.Roster);
  protected elementalReactionManager: ElementalReactionManager = container.get(ContainerBindings.ElementalReactionManager);
  protected energyManager: EnergyManager = container.get(ContainerBindings.EnergyManager);
  protected globalListeners: GlobalListeners = container.get(ContainerBindings.GlobalListeners);

  public doAction(args: IGetDamageArgs): void {
    if (!this.isStarted) return;
    this.isMVsMode = args.mvsCalcMode ?? false;
    const calcArgs = convertGetDamageToCalcDamageArgs(args);
    this.onAction(calcArgs);
  }

  public doDamage(args: ICalcDamageArgs, damage: number) {
    const {character} = args;

    const dmgBonus = this.strategy.hasInfusion
      ? character.calculatorStats.getElementalDmgBonus(character.vision)
      : character.calculatorStats.getPhysicalDmgBonus();

    const statValue = new StatValue(dmgBonus);
    character.calculatorStats.ATK.affixes.add(statValue);

    let dmg: number = 0;

    if (isIDOTSkill(this)) {
      if (this.damageFrames.includes(this.currentFrame)) {
        dmg = this.onHit(args, damage);
      }
    } else {
      dmg = this.onHit(args, damage);
    }

    character.calculatorStats.ATK.affixes.remove(statValue);
    this.globalListeners.onDamage.notifyAll({
      character: args.character,
      skill: this,
      value: dmg,
    });
  }

  private onHit(args: ICalcDamageArgs, damage: number) {
    let totalDmg = 0;

    const entities = this.roster.entities;

    if (this.strategy.hasInfusion && !this.ICD?.onCountdown) {
      const applyReaction = (entity: Entity) => {
        const reactionArgs: IElementalReactionArgs = {
          character: args.character,
          damage,
          elementalStatus: this.elementalStatus!!,
          entity,
        }

        let tempDmg = this.elementalReactionManager!!.applyReaction(reactionArgs);
        totalDmg += tempDmg;
      }

      if (this.targetType === SkillTargetType.Single) {
        const [enemy] = entities;
        applyReaction(enemy);
      } else {
        for (let enemy of entities) {
          applyReaction(enemy);
        }
      }
    } else {
      totalDmg = damage;
    }

    this.ICD?.addHit();
    return totalDmg || damage;
  }

  public doHeal(args: ICalcDamageArgs, healValue: number) {
    this.globalListeners.onHeal.notifyAll({
      character: args.character,
      skill: this,
      value: healValue,
    });
  }

  public createShield(args: ICalcDamageArgs, shieldDurability: number) {
    this.globalListeners.onCreateShield.notifyAll({
      character: args.character,
      skill: this,
      value: shieldDurability,
    });
  }

  private behavior: SkillBehavior = new SkillBehavior(this);

  public get isStarted() {
    return this.behavior.isStarted;
  }

  public get isOnCountdown() {
    return this.behavior.isOnCountdown;
  }

  public get currentFrame() {
    return this.behavior.currentFrame;
  }

  public start(args: ISkillBehaviorArgs): Skill {
    return this.behavior.start(args);
  }

  public update(args: ISkillBehaviorArgs): Skill {
    return this.behavior.update(args);
  }

  public end(args: ISkillBehaviorArgs): Skill {
    return this.behavior.end(args);
  }

  public awake(args: IGetDamageArgs): void {
    const calcArgs = convertGetDamageToCalcDamageArgs(args);
    this.onAwake(calcArgs);
  }

  public onStart(args: ISkillBehaviorArgs): void {}
  public onUpdate(args: ISkillBehaviorArgs): void {}
  public onEnd(args: ISkillBehaviorArgs): void {}
  protected onAwake(args: ICalcDamageArgs): void {}

  protected createRepeatedFrames(everyFrames: number, count: number, offset: number = 0): number[] {
    let temp: number[] = [];

    for (let i = 0; i < count; i++) {
      const frame = Math.ceil(everyFrames * i + offset);
      temp.push(frame);
    }

    return temp;
  }
}
