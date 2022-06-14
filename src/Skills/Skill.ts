import Character from "@/Entities/Characters/Character";
import {ISkillStrategy} from "@/Skills/SkillStrategy";
import {SkillTargetType} from "@/Skills/SkillTargetType";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import ICD from "@/Skills/ICD";
import ElementalStatus from "@/ElementalStatuses/ElementalStatus";
import SkillLvl from "@/Skills/SkillLvl";
import {IBehaviorWithEvents} from "@/Behavior/IBehaviorWithEvents";
import SkillBehavior, {ISkillBehaviorArgs} from "@/Behavior/SkillBehavior";
import Roster from "@/Roster/Roster";
import ElementalReactionManager from "@/ElementalReactions/ElementalReactionManager";
import EnergyManager, {IEnergyParticles} from "@/Roster/EnergyManager";
import {IElementalReactionArgs} from "@/ElementalReactions/ElementalReaction";
import Entity from "@/Entities/Entity";
import GlobalListeners from "@/Roster/GlobalListeners";
import SkillCountdown from "@/Skills/SkillCountdown";
import DamageCalculator from "@/Roster/DamageCalculator";
import SkillInfusion from "@/Skills/SkillInfusion";
import {Constructor} from "@/Helpers/Constructor";
import {IWithCreator} from "@/Utils/IWithCreator";
import {cloneDeep} from "lodash";
import SkillArgs from "@/Skills/Args/SkillArgs";
import SkillDamageArgs from "@/Skills/Args/SkillDamageArgs";
import SkillActionArgs from "@/Skills/Args/SkillActionArgs";

export default abstract class Skill implements IBehaviorWithEvents<Skill, SkillArgs>, IWithCreator<Skill> {
  public abstract strategy: ISkillStrategy;

  public get creator(): Constructor<Skill> {
    return this.constructor as Constructor<Skill>;
  }

  public get clone() {
    return cloneDeep(this);
  }

  public abstract frames: number;
  public abstract countdownFrames: number;

  public ignoreLog: boolean = false;

  public get timelineDurationFrames(): number {
    return this.frames;
  }

  public abstract targetType: SkillTargetType;
  public abstract damageRegistrationType: SkillDamageRegistrationType;

  public ICD: ICD | null = null;
  public infusion: SkillInfusion = new SkillInfusion();
  public lvl: SkillLvl = new SkillLvl(this);

  public abstract skillName: string;

  public get title(): string {
    return `${this.strategy.skillTypeName} (${this.skillName})`;
  }

  public subscribeEffects(character: Character): void {
  }

  public unsubscribeEffects(character: Character): void {
  }

  protected roster: Roster = Roster.instance;
  protected damageCalculator: DamageCalculator = DamageCalculator.instance;
  protected reactionManager: ElementalReactionManager = ElementalReactionManager.instance;
  protected globalListeners: GlobalListeners = GlobalListeners.instance;

  private energyManager: EnergyManager = EnergyManager.instance;

  protected addEnergy(particles: IEnergyParticles) {
    this.energyManager.addEnergy(particles);
  }

  public doAction(args: SkillArgs): void {
    if (!this.isStarted) return;
    const infusionBonus = this.infusion.applyBonus(args.character);
    this.onAction(args);
    this.infusion.removeBonus(args.character, infusionBonus);
  }

  public abstract onAction(args: SkillArgs): void;

  public doDamage(args: SkillDamageArgs, comment: string = "") {
    const frame = DamageCalculator.instance.currentFrame;
    let dmg: number = this.performHit(args);

    this.globalListeners.onDamage.notifyAll({
      character: args.character,
      elementalStatus: args.elementalStatus,
      comment,
      skill: this,
      value: dmg,
    });
  }

  private performHit(args: SkillDamageArgs) {
    const damage = args.value;
    const {elementalStatus} = args;
    const hits = args.hits ?? 1;
    let totalDmg = 0;

    const createArgs = (entity: Entity): IElementalReactionArgs => ({
      character: args.character,
      damage,
      elementalStatus,
      entity,
    });

    // if (args.blunt) {
    //   const applyShatter = (entity: Entity) =>
    //     this.reactionManager.checkShatter(createArgs(entity), true);
    //   this.doOnSkillType(applyShatter);
    // }

    if (elementalStatus && !this.ICD?.onCountdown) {
      this.ICD?.startCountdown();
      const applyReaction = (entity: Entity) =>
        totalDmg += this.reactionManager.applyReaction(createArgs(entity));
      this.doOnSkillType(applyReaction);
    } else {
      totalDmg = damage;
    }

    if (this.ICD) {
      for (let i = 0; i < hits; i++) {
        this.ICD.addHit();
      }
    }

    return totalDmg || damage;
  }

  private doOnSkillType(action?: (entity: Entity) => void) {
    const {enemies} = this.roster;

    if (this.targetType === SkillTargetType.Single) {
      const [enemy] = enemies;
      action?.(enemy);
    } else if (this.targetType === SkillTargetType.AOE) {
      for (let enemy of enemies) {
        action?.(enemy);
      }
    }
  }

  public doHeal(args: SkillActionArgs, comment: string = "") {
    this.globalListeners.onHeal.notifyAll({
      character: args.character,
      comment,
      skill: this,
      value: args.value,
    });
  }

  public createShield(args: SkillActionArgs, comment: string = "") {
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

  public start(args: SkillArgs): Skill {
    return this.behavior.start(args);
  }

  public update(args: SkillArgs): Skill {
    return this.behavior.update(args);
  }

  public end(args: SkillArgs): Skill {
    return this.behavior.end(args);
  }

  public awake(args: SkillArgs): void {
    this.onAwake(args);
  }

  public onStart(args: SkillArgs): void {}
  public onUpdate(args: SkillArgs): void {}
  public onEnd(args: SkillArgs): void {}
  protected onAwake(args: SkillArgs): void {}

  protected createRepeatedFrames(everyFrames: number, count: number, offset: number = 0): number[] {
    let temp: number[] = [];

    for (let i = 0; i < count; i++) {
      const frame = Math.ceil(everyFrames * i + offset);
      temp.push(frame);
    }

    return temp;
  }
}
