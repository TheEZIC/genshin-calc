import Character from "@/Entities/Characters/Character";
import {ISkillStrategy} from "@/Skills/SkillStrategy";
import {SkillTargetType} from "@/Skills/SkillTargetType";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import ICD from "@/Skills/ICD";
import SkillLvl from "@/Skills/SkillLvl";
import {IEnergyParticles} from "@/Roster/EnergyManager";
import {IElementalReactionManagerArgs} from "@/ElementalReactions/ElementalReaction";
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
import SkillShieldArgs from "@/Skills/Args/SkillShieldArgs";
import CombatActions, {ICombatDamageArgs, ICombatHealArgs, ICombatShieldArgs} from "@/Skills/CombatActions";

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

  public ICD?: ICD;
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
    const combat = new CombatActions(args.damageCalculator);

    for (let target of this.getTargets(args)) {
      const damageArgs: ICombatDamageArgs = {
        character: args.character,
        source: this,
        target,
        elementalStatus: args.elementalStatus,
        ICD: this.ICD,
        comment,
        value: args.value,
      };

      this.strategy.runBeforeDamageListener(damageArgs);
      const afterArgs = combat.doDamage(damageArgs);
      this.strategy.runDamageListener(afterArgs);
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

  public doHeal(args: SkillActionArgs, targets: Entity[], comment: string = "") {
    const combat = new CombatActions(args.damageCalculator);

    for (let target of targets) {
      const healArgs: ICombatHealArgs = {
        character: args.character,
        source: this,
        target,
        comment,
        value: args.value,
      };

      combat.doHeal(healArgs);
      this.strategy.runHealListener(healArgs);
    }
  }

  public createShield(args: SkillShieldArgs, targets: Entity[], comment: string = "") {
    const combat = new CombatActions(args.damageCalculator);

    for (let target of targets) {
      args.shield.activate(target);

      const createShieldArgs: ICombatShieldArgs = {
        character: args.character,
        source: this,
        target,
        comment,
        value: args.value,
        shield: args.shield,
      };

      combat.createShield(createShieldArgs);
      this.strategy.runCreateShieldListener(createShieldArgs);
    }
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
