import Character from "@/Entities/Characters/Character";
import {ISkillStrategy} from "@/Skills/SkillStrategy";
import {SkillTargetType} from "@/Skills/SkillTargetType";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import ICD from "@/Skills/ICD";
import SkillLvl from "@/Skills/SkillLvl";
import {IBehaviorWithEvents} from "@/Behavior/IBehaviorWithEvents";
import SkillBehavior from "@/Behavior/SkillBehavior";
import {IEnergyParticles} from "@/Roster/EnergyManager";
import {IElementalReactionArgs} from "@/ElementalReactions/ElementalReaction";
import Entity from "@/Entities/Entity";
import SkillCountdown from "@/Skills/SkillCountdown";
import SkillInfusion from "@/Skills/SkillInfusion";
import {Constructor} from "@/Helpers/Constructor";
import {IWithCreator} from "@/Utils/IWithCreator";
import SkillArgs from "@/Skills/Args/SkillArgs";
import SkillDamageArgs from "@/Skills/Args/SkillDamageArgs";
import SkillActionArgs from "@/Skills/Args/SkillActionArgs";
import Enemy from "@/Entities/Enemies/Enemy";

export default abstract class Skill implements IBehaviorWithEvents<Skill, SkillArgs>, IWithCreator<Skill> {
  public abstract strategy: ISkillStrategy;

  public get creator(): Constructor<Skill> {
    return this.constructor as Constructor<Skill>;
  }

  public get clone(): Skill {
    return new this.creator();
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
    let dmg: number = this.performHit(args);

    args.damageCalculator.globalListeners.onDamage.notifyAll({
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
      damageCalculator: args.damageCalculator,
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
      const applyReaction = (entity: Entity) => {
        totalDmg += args.damageCalculator.reactionsManager.applyReaction(createArgs(entity));
      }

      this.ICD?.startCountdown();
      this.doOnSkillType(args, applyReaction);
    } else {
      totalDmg = damage;
    }

    this.doOnSkillType(args, (enemy) => {
      totalDmg = this.applyDamageFactors(args.character, enemy, totalDmg);
    });

    if (this.ICD) {
      for (let i = 0; i < hits; i++) {
        this.ICD.addHit();
      }
    }

    return totalDmg || damage;
  }

  private doOnSkillType(args: SkillDamageArgs, action: (entity: Enemy) => void) {
    const {enemies} = args.damageCalculator.roster;

    if (this.targetType === SkillTargetType.Single) {
      const [enemy] = enemies;
      action(enemy);
    } else if (this.targetType === SkillTargetType.AOE) {
      for (let enemy of enemies) {
        action(enemy);
      }
    }
  }

  private applyDamageFactors(character: Character, target: Enemy, damage: number): number {
    damage *= character.calculatorStats.critDamage.critEffect;

    return damage;
  }

  public doHeal(args: SkillActionArgs, comment: string = "") {
    args.damageCalculator.globalListeners.onHeal.notifyAll({
      character: args.character,
      comment,
      skill: this,
      value: args.value,
    });
  }

  public createShield(args: SkillActionArgs, comment: string = "") {
    args.damageCalculator.globalListeners.onCreateShield.notifyAll({
      character: args.character,
      comment,
      skill: this,
      value: args.value,
    });
  }

  protected addInfusion(args: SkillArgs) {
    this.infusion.add({
      element: args.character.vision,
      zIndex: 99,
    })
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
    this.infusion.clearBonus();
    this.behavior.start(args);
    this.infusion.applyBonus(args.character);

    return this;
  }

  public update(args: SkillArgs): Skill {
    this.behavior.update(args);

    return this;
  }

  public end(args: SkillArgs): Skill {
    this.behavior.end(args);
    this.infusion.removeBonus(args.character);

    return this;
  }

  public awake(args: SkillArgs): void {
    this.onAwake(args);
  }

  public onStart(args: SkillArgs): void {}
  public onAction(args: SkillArgs): void {};
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
