import ElementalReactionManager from "@/ElementalReactions/ElementalReactionManager";
import Character from "@/Entities/Characters/Character";
import Listener from "@/Helpers/Listener";
import ElementalStatus from "@/ElementalStatuses/ElementalStatus";
import Entity from "@/Entities/Entity";
import DamageCalculator from "@/Roster/DamageCalculator";
import {ActionSource} from "@/Skills/CombatActions";

export interface IOnReactionArgs {
  reaction: ElementalReaction;
  character: Character;
  damage: number;
}

interface IBaseElementalReactionArgs {
  damageCalculator: DamageCalculator;
  character: Character;
  entity: Entity;
  damage: number;
  fromSwirl?: boolean;
}

export interface IElementalReactionManagerArgs extends IBaseElementalReactionArgs {
  source?: ActionSource;
  elementalStatus?: ElementalStatus;

}

export interface IElementalReactionArgs extends IBaseElementalReactionArgs {
  source: ActionSource;
  aura: ElementalStatus;
  trigger: ElementalStatus;
  ignoreReaction: boolean;
  entity: Entity;
}

export default abstract class ElementalReaction {
  constructor(
    protected elementalReactionManager: ElementalReactionManager
  ) {
  }

  public get name() {
    return this.constructor.name;
  }

  public abstract triggerMultiplier: number;
  public abstract applyBonusDamage(args: IElementalReactionArgs): number;

  public onExecuteListener: Listener<IOnReactionArgs> = new Listener<IOnReactionArgs>();

  protected getDamage(damage: number, bonusDamage: number) {
    return bonusDamage;
  }

  public execute(args: IElementalReactionArgs) {
    let {character, damage, ignoreReaction, aura, trigger} = args;
    const bonusDamage = !ignoreReaction
      ? this.applyBonusDamage(args)
      : 0;

    aura.react(trigger, this);

    this.onExecuteListener.notifyAll({
      reaction: this,
      character,
      damage,
    });

    damage += this.getDamage(damage, bonusDamage);

    return damage;
  }
}
