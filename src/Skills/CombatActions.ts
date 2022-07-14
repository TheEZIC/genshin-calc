import Character from "@/Entities/Characters/Character";
import Enemy from "@/Entities/Enemies/Enemy";
import ElementalStatus from "@/ElementalStatuses/ElementalStatus";
import {VisionType} from "@/VisionType";
import DamageCalculator from "@/Roster/DamageCalculator";
import ShieldEffect from "@/Effects/ShieldEffect";
import Entity from "@/Entities/Entity";
import PyroStatus from "@/ElementalStatuses/List/PyroStatus";
import CryoStatus from "@/ElementalStatuses/List/CryoStatus";
import FreezeStatus from "@/ElementalStatuses/List/FreezeStatus";
import HydroStatus from "@/ElementalStatuses/List/HydroStatus";
import GeoStatus from "@/ElementalStatuses/List/GeoStatus";
import DendroStatus from "@/ElementalStatuses/List/DendroStatus";
import AnemoStatus from "@/ElementalStatuses/List/AnemoStatus";
import {IElementalReactionManagerArgs} from "@/ElementalReactions/ElementalReaction";
import ICD from "@/Skills/ICD";
import Effect from "@/Effects/Effect";
import Skill from "@/Skills/Skill";
import ElectroStatus from "@/ElementalStatuses/List/ElectroStatus";

export type ActionSource = Skill | Effect<any> | Character;

interface ICombatArgs {
  source: ActionSource;
  character: Character;
  value: number;
  comment?: string;
}

export interface ICombatDamageArgs extends ICombatArgs {
  target: Entity;
  damageVision?: VisionType;
  elementalStatus?: ElementalStatus;
  ICD?: ICD;
  element?: VisionType | null;
  hits?: number;
  blunt?: number;
  ignoreICDApply?: boolean;
  ignoreReactions?: boolean;
  ignoreCrits?: boolean;
  ignoreAllDef?: boolean;
  ignoreAllResistance?: boolean;
}

export interface ICombatHealArgs extends ICombatArgs {
  target: Entity;
}

export interface ICombatShieldArgs extends ICombatArgs {
  target: Entity;
  shield: ShieldEffect<Entity>;
}

export default class CombatActions {
  constructor(
    private damageCalculator: DamageCalculator
  ) {
  }

  public doDamage(args: ICombatDamageArgs): ICombatDamageArgs {
    const afterHit = this.performHit(args);
    const afterFactor = this.applyDamageFactors(args, args.target, afterHit);
    args.value = afterFactor;
    this.damageCalculator.globalListeners.onDamage.notifyAll(args);
    return args;
  }

  public doHeal(args: ICombatHealArgs): ICombatHealArgs {
    this.damageCalculator.globalListeners.onHeal.notifyAll(args);
    return args;
  }

  public createShield(args: ICombatShieldArgs): ICombatShieldArgs {
    this.damageCalculator.globalListeners.onCreateShield.notifyAll(args);
    return args;
  }

  private performHit(args: ICombatDamageArgs) {
    const damageCalculator = args.character.damageCalculator;

    const ICD = args.ICD;
    const damage = args.value;
    const {elementalStatus} = args;
    const hits = args.hits ?? 1;
    let totalDmg = 0;

    const createArgs = (entity: Entity): IElementalReactionManagerArgs => ({
      character: args.character,
      damageCalculator,
      damage,
      elementalStatus,
      entity,
    });

    if (args.blunt) {
      const applyShatter = (entity: Entity) => {
        damageCalculator.reactionsManager.checkShatter(createArgs(entity), true);
      }

      applyShatter(args.target);
    }

    if (elementalStatus && !args.ignoreReactions && !ICD?.onCountdown) {
      const applyReaction = (entity: Entity) => {
        //add damage if amplifying reaction
        totalDmg += damageCalculator.reactionsManager.applyReaction(createArgs(entity));
      }

      ICD?.startCountdown();
      applyReaction(args.target)
    } else {
      totalDmg = damage;
    }

    const damageArgs = {
      character: args.character,
      target: args.target,
      elementalStatus: args.elementalStatus,
      source: args.source,
      skill: this,
      value: totalDmg,
    };

    //skill.strategy.runDamageListener(damageArgs);

    if (!args.ignoreICDApply && ICD) {
      for (let i = 0; i < hits; i++) {
        ICD.addHit();
      }
    }

    return totalDmg || damage;
  }

  private applyDamageFactors(args: ICombatDamageArgs, target: Entity, damage: number): number {
    const {character} = args;

    let totalDamage = damage;

    if (!args.ignoreCrits) {
      totalDamage *= character.calculatorStats.critDamage.critEffect;
    }

    if (!args.ignoreAllDef && target instanceof Enemy) {
      totalDamage *= this.getDefFactor(character, target);
    }

    if (!args.ignoreAllResistance && target instanceof Enemy) {
      totalDamage *= this.getResistanceFactor(args, target);
    }

    return totalDamage;
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

  private getResistanceFactor(args: ICombatDamageArgs, target: Enemy) {
    if (args.damageVision) {
      return this.getResistanceFromVision(args.damageVision, target);
    } else if (args.elementalStatus) {
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
      case DendroStatus:
        return target.calculatorStats.dendroResistance.calc();
      case ElectroStatus:
        return target.calculatorStats.electroResistance.calc();
      case AnemoStatus:
        return target.calculatorStats.anemoResistance.calc();
      default:
        return 0;
    }
  }

  private getResistanceFromVision(vision: VisionType, target: Enemy) {
    switch (vision) {
      case VisionType.Pyro:
        return target.calculatorStats.pyroResistance.calc();
      case VisionType.Cryo:
        return target.calculatorStats.cryoResistance.calc();
      case VisionType.Hydro:
        return target.calculatorStats.hydroResistance.calc();
      case VisionType.Geo:
        return target.calculatorStats.geoResistance.calc();
      case VisionType.Dendro:
        return target.calculatorStats.dendroResistance.calc();
      case VisionType.Electro:
        return target.calculatorStats.electroResistance.calc();
      case VisionType.Anemo:
        return target.calculatorStats.anemoResistance.calc();
      default:
        return 0;
    }
  }
}
