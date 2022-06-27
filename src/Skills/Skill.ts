import Character from "@/Entities/Characters/Character";
import {ISkillStrategy} from "@/Skills/SkillStrategy";
import {SkillTargetType} from "@/Skills/SkillTargetType";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import ICD from "@/Skills/ICD";
import SkillLvl from "@/Skills/SkillLvl";
import {IEnergyParticles} from "@/Roster/EnergyManager";
import {IElementalReactionArgs} from "@/ElementalReactions/ElementalReaction";
import Entity from "@/Entities/Entity";
import SkillInfusion from "@/Skills/SkillInfusion";
import {Constructor} from "@/Helpers/Constructor";
import {IWithCreator} from "@/Utils/IWithCreator";
import SkillArgs from "@/Skills/Args/SkillArgs";
import SkillDamageArgs from "@/Skills/Args/SkillDamageArgs";
import SkillActionArgs from "@/Skills/Args/SkillActionArgs";
import Enemy from "@/Entities/Enemies/Enemy";
import BehaviorUnit from "@/Behavior/BehaviorUnit";
import {isIBurstSKill} from "@/Skills/SkillTypes/IBurstSkill";
import CooldownItem from "@/Cooldown/CooldownItem";
import SkillListenerArgs from "@/Skills/Args/SkillListenerArgs";
import ElementalStatus from "@/ElementalStatuses/ElementalStatus";
import PyroStatus from "@/ElementalStatuses/List/PyroStatus";
import CryoStatus from "@/ElementalStatuses/List/CryoStatus";
import FreezeStatus from "@/ElementalStatuses/List/FreezeStatus";
import HydroStatus from "@/ElementalStatuses/List/HydroStatus";
import GeoStatus from "@/ElementalStatuses/List/GeoStatus";
import DendroStatus from "@/ElementalStatuses/List/DendroStatus";
import AnemoStatus from "@/ElementalStatuses/List/AnemoStatus";

export default abstract class Skill extends BehaviorUnit<SkillArgs> implements IWithCreator<Skill> {
  public abstract strategy: ISkillStrategy;

  public get creator(): Constructor<Skill> {
    return this.constructor as Constructor<Skill>;
  }

  public get clone(): Skill {
    return new this.creator();
  }

  public abstract countdownFrames: number;

  public ignoreLog: boolean = false;

  public get timelineDurationFrames(): number {
    return this.frames;
  }

  public abstract targetType: SkillTargetType;
  public abstract damageRegistrationType: SkillDamageRegistrationType;

  public ICD: ICD | null = null;
  public infusion: SkillInfusion = new SkillInfusion(this);
  public lvl: SkillLvl = new SkillLvl(this);

  public abstract skillName: string;

  public get title(): string {
    return `${this.strategy.skillTypeName} (${this.skillName})`;
  }

  public subscribeEffects(character: Character): void {
  }

  public unsubscribeEffects(character: Character): void {
  }

  protected addEnergy(args: SkillArgs, particles: IEnergyParticles) {
    args.damageCalculator.energyManager.addEnergy(particles);
  }

  public doAction(args: SkillArgs): void {
    if (!this.isStarted) return;
    this.onAction(args);
  }

  public doDamage(args: SkillDamageArgs, comment: string = "") {
    const beforeDamageArgs = {
      character: args.character,
      targets: this.getTargets(args),
      elementalStatus: args.elementalStatus,
      comment,
      skill: this,
      value: args.value,
    };

    this.strategy.runBeforeDamageListener(beforeDamageArgs);

    let dmg: number = this.performHit(args);
    const damageArgs = {
      character: args.character,
      targets: this.getTargets(args),
      elementalStatus: args.elementalStatus,
      comment,
      skill: this,
      value: dmg,
    };

    args.damageCalculator.globalListeners.onDamage.notifyAll(damageArgs);
    this.strategy.runDamageListener(damageArgs);
  }

  private performHit(args: SkillDamageArgs) {
    const damage = args.value;
    const {elementalStatus} = args;
    const hits = args.hits ?? 1;
    let totalDmg = 0;

    const createArgs = (entity: Entity): IElementalReactionArgs => ({
      character: args.character,
      damageCalculator: args.damageCalculator,
      damage,
      elementalStatus,
      entity,
    });

    if (args.blunt) {
      const applyShatter = (entity: Entity) => {
        args.damageCalculator.reactionsManager.checkShatter(createArgs(entity), true);
      }

      this.doForEachTarget(args, applyShatter);
    }

    if (elementalStatus && !this.ICD?.onCountdown) {
      const applyReaction = (entity: Entity) => {
        totalDmg += args.damageCalculator.reactionsManager.applyReaction(createArgs(entity));
      }

      this.ICD?.startCountdown();
      this.doForEachTarget(args, applyReaction);
    } else {
      totalDmg = damage;
    }

    this.doForEachTarget(args, (enemy) => {
      totalDmg += this.applyDamageFactors(args, enemy, totalDmg);
    });

    if (this.ICD) {
      for (let i = 0; i < hits; i++) {
        this.ICD.addHit();
      }
    }

    return totalDmg || damage;
  }

  protected doForEachTarget(args: SkillDamageArgs, action: (entity: Enemy) => void) {
    const targets = this.getTargets(args);

    for (let target of targets) {
      action(target);
    }
  }

  protected getTargets(args: SkillArgs | SkillDamageArgs | SkillActionArgs): Enemy[] {
    const {enemies} = args.damageCalculator.roster;
    let type: SkillTargetType = this.targetType;
    let targets: Enemy[] = [];

    if (args instanceof SkillDamageArgs && args.targetType) {
      type = args.targetType;
    }

    if (type === SkillTargetType.Single) {
      const [enemy] = enemies;
      targets.push(enemy);
    } else if (type === SkillTargetType.AOE) {
      targets = enemies;
    }

    return targets;
  }

  private applyDamageFactors(args: SkillDamageArgs, target: Enemy, damage: number): number {
    const {character} = args;

    let totalDamage = damage;

    totalDamage *= character.calculatorStats.critDamage.critEffect;
    totalDamage *= this.getDefFactor(character, target);
    totalDamage *= this.getResistanceFactor(args, target);

    return totalDamage - damage;
  }

  private getDefFactor(character: Character, target: Enemy): number {
    const characterLvl = character.lvl;
    const enemyLvl = target.lvl;

    let defFactor = (characterLvl + 100) /
      (
        (characterLvl + 100) +
        (enemyLvl + 100) *
        //armor reduction
        (1 - (target.calculatorStats.defReduction.calc()) / 100) *
        //armor penetration
        (1 - (target.calculatorStats.defShred.calc()) / 100)
      );

    return defFactor;
  }

  private getResistanceFactor(args: SkillDamageArgs, target: Enemy) {
    if (args.elementalStatus) {
      return this.getResistanceFromStatus(args.elementalStatus, target);
    } else {
      return target.calculatorStats.physicalResistance.calc();
    }
  }

  private getResistanceFromStatus(elementalStatus: ElementalStatus, target: Enemy): number {
    switch (elementalStatus.constructor) {
      case PyroStatus:
        return target.calculatorStats.pyroResistance.calc();
      case CryoStatus:
      case FreezeStatus:
        return target.calculatorStats.cryoResistance.calc();
      case HydroStatus:
        return target.calculatorStats.hydroResistance.calc();
      case GeoStatus:
        return target.calculatorStats.geoResistance.calc();
      case ElementalStatus:
        return target.calculatorStats.geoResistance.calc();
      case DendroStatus:
        return target.calculatorStats.dendroResistance.calc();
      case CryoStatus:
        return target.calculatorStats.cryoResistance.calc();
      case AnemoStatus:
        return target.calculatorStats.anemoResistance.calc();
      default:
        return 0;
    }
  }

  public doHeal(args: SkillActionArgs, comment: string = "") {
    const healArgs = {
      character: args.character,
      targets: this.getTargets(args),
      comment,
      skill: this,
      value: args.value,
    };

    args.damageCalculator.globalListeners.onHeal.notifyAll(healArgs);
    this.strategy.runHealListener(healArgs);
  }

  public createShield(args: SkillActionArgs, comment: string = "") {
    const createShieldArgs = {
      character: args.character,
      targets: this.getTargets(args),
      comment,
      skill: this,
      value: args.value,
    };

    args.damageCalculator.globalListeners.onCreateShield.notifyAll(createShieldArgs);
    this.strategy.runCreateShieldListener(createShieldArgs);
  }

  protected addInfusion(args: SkillArgs) {
    this.infusion.add({
      element: args.character.vision,
      zIndex: 99,
    })
  }

  private _cooldown: CooldownItem = new CooldownItem();

  public get cooldown() {
    this._cooldown.changeCooldownFrames(this.countdownFrames);
    return this._cooldown;
  }

  protected override onStart(args: SkillArgs): void {
    this.infusion.clearBonus();
    this.infusion.applyBonus(args.character);

    const listenerArgs = new SkillListenerArgs({
      ...args,
      targets: this.getTargets(args),
    });

    this.strategy.runStartListener(listenerArgs);
    args.damageCalculator.globalListeners.onSkillStarted.notifyAll(listenerArgs);

    if (isIBurstSKill(this)) {
      args.character.consumeEnergy(this.energyConsumed);
    }
  }

  protected override shouldStart(args: SkillArgs): boolean {
    if (
      isIBurstSKill(this)
      && args.character.energy < this.energyCost
    ) {
      return false;
    }

    return super.shouldStart(args);
  }

  protected override onEnd(args: SkillArgs): void {
    const listenerArgs = new SkillListenerArgs({
      ...args,
      targets: this.getTargets(args),
    });

    this.infusion.removeBonus(args.character);
    this.strategy.runEndListener(listenerArgs);
    args.damageCalculator.globalListeners.onSkillEnded.notifyAll(listenerArgs);
  }

  protected createRepeatedFrames(everyFrames: number, count: number, offset: number = 0): number[] {
    let temp: number[] = [];

    for (let i = 0; i < count; i++) {
      const frame = Math.ceil(everyFrames * i + offset);
      temp.push(frame);
    }

    return temp;
  }
}
