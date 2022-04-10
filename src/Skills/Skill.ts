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
import EnergyManager, {IEnergyParticles} from "@/Roster/EnergyManager";
import {IElementalReactionArgs} from "@/ElementalReactions/ElementalReaction";
import Entity from "@/Entities/Entity";
import GlobalListeners from "@/Roster/GlobalListeners";
import SkillCountdown from "@/Skills/SkillCountdown";
import DamageCalculator from "@/Roster/DamageCalculator";

export interface ISkillActionArgs {
  character: Character;
  prevSkill?: Skill;
  nextSkill?: Skill;
  prevSkills?: Skill[];
  nextSkills?: Skill[];
  behavior: ISkillBehaviorArgs;
  value: number;
}

export interface ISkillDamageArgs extends ISkillActionArgs{
  elementalStatus?: ElementalStatus;
}

export interface IGetDamageArgs {
  character: Character;
  skills: Skill[];
  currentSkillIndex: number;
  mvsCalcMode?: boolean;
  behavior: ISkillBehaviorArgs;
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
  public effectManager: EffectManager<Character> | null = null;

  public lvl: SkillLvl = new SkillLvl(this);

  public get name(): string {
    return this.constructor.name;
  }

  public abstract onAction(args: ISkillActionArgs): void;

  protected roster: Roster = container.get(ContainerBindings.Roster);
  protected damageCalculator: DamageCalculator = container.get(ContainerBindings.DamageCalculator);
  protected elementalReactionManager: ElementalReactionManager = container.get(ContainerBindings.ElementalReactionManager);
  protected globalListeners: GlobalListeners = container.get(ContainerBindings.GlobalListeners);

  private energyManager: EnergyManager = container.get(ContainerBindings.EnergyManager);

  protected addEnergy(particles: IEnergyParticles) {
    this.energyManager.addEnergy(particles);
  }

  public doAction(args: IGetDamageArgs): void {
    if (!this.isStarted) return;
    const calcArgs = convertGetDamageToCalcDamageArgs(args);
    const infusionBonus = this.applyInfusion(args.character);
    this.onAction(calcArgs);
    this.removeInfusion(args.character, infusionBonus);
  }

  private applyInfusion(character: Character): StatValue {
    const dmgBonus = this.strategy.hasInfusion
      ? character.calculatorStats.getElementalDmgBonus(character.vision)
      : character.calculatorStats.getPhysicalDmgBonus();

    const statValue = new StatValue(dmgBonus);
    character.calculatorStats.ATK.affixes.add(statValue);

    return statValue;
  }

  private removeInfusion(character: Character, statValue: StatValue) {
    character.calculatorStats.ATK.affixes.remove(statValue);
  }

  public doDamage(args: ISkillDamageArgs, comment: string = "") {
    let dmg: number = this.onHit(args);

    this.globalListeners.onDamage.notifyAll({
      character: args.character,
      elementalStatus: args.elementalStatus,
      comment,
      skill: this,
      value: dmg,
    });
  }

  private onHit(args: ISkillDamageArgs) {
    const damage = args.value;
    let totalDmg = 0;

    const entities = this.roster.enemies;
    const {elementalStatus} = args;

    if (elementalStatus && !this.ICD?.onCountdown) {
      this.ICD?.startCountdown();
      const applyReaction = (entity: Entity) => {
        const reactionArgs: IElementalReactionArgs = {
          character: args.character,
          damage,
          elementalStatus,
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

  public doHeal(args: ISkillActionArgs, comment: string = "") {
    this.globalListeners.onHeal.notifyAll({
      character: args.character,
      comment,
      skill: this,
      value: args.value,
    });
  }

  public createShield(args: ISkillActionArgs, comment: string = "") {
    this.globalListeners.onCreateShield.notifyAll({
      character: args.character,
      comment,
      skill: this,
      value: args.value,
    });
  }

  public behavior: SkillBehavior = new SkillBehavior(this);
  public countdown: SkillCountdown = new SkillCountdown(this);

  public get isStarted() {
    return this.behavior.isStarted;
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
  protected onAwake(args: ISkillActionArgs): void {}

  protected createRepeatedFrames(everyFrames: number, count: number, offset: number = 0): number[] {
    let temp: number[] = [];

    for (let i = 0; i < count; i++) {
      const frame = Math.ceil(everyFrames * i + offset);
      temp.push(frame);
    }

    return temp;
  }
}
