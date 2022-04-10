import ElementalReactionManager from "@/ElementalReactions/ElementalReactionManager";
import Character from "@/Entities/Characters/Character";
import Listener from "@/Helpers/Listener";
import ElementalStatus from "@/ElementalStatuses/ElementalStatus";
import Entity from "@/Entities/Entity";

export interface IOnReactionArgs {
  reaction: ElementalReaction;
  character: Character;
  damage: number;
}

export interface IElementalReactionArgs {
  character: Character;
  elementalStatus: ElementalStatus | null;
  entity: Entity;
  damage: number;
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

  public execute(args: IElementalReactionArgs) {
    const {character} = args;
    const damage = this.applyBonusDamage(args);
    this.onExecuteListener.notifyAll({reaction: this, character, damage});

    return damage;
  }
}
