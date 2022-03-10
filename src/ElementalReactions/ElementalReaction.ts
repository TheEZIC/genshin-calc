import Character from "@/Entities/Characters/Character";
import Listener from "@/Helpers/Listener";
import ElementalStatus from "@/ElementalStatuses/ElementalStatus";
import Entity from "@/Entities/Entity";
import ElementalReactionManager from "@/ElementalReactions/ElementalReactionManager";

export interface IOnReactionArgs {
  reaction: ElementalReaction;
  character: Character;
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

  public abstract triggerMultiplier: number;
  public abstract applyBonusDamage(args: IElementalReactionArgs): number;

  public onExecuteListener: Listener<IOnReactionArgs> = new Listener<IOnReactionArgs>();

  public execute(args: IElementalReactionArgs) {
    const {character} = args;
    this.onExecuteListener.notifyAll({reaction: this, character});
    this.applyBonusDamage(args);
  }
}
