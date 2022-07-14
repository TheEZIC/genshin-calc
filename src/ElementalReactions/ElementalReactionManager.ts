import Listener from "@/Helpers/Listener";
import ElementalStatus from "@/ElementalStatuses/ElementalStatus";
import ElementalReaction, {
  IElementalReactionArgs,
  IElementalReactionManagerArgs,
  IOnReactionArgs
} from "@/ElementalReactions/ElementalReaction";
import {Constructor} from "@/Helpers/Constructor";
import PyroStatus from "@/ElementalStatuses/List/PyroStatus";
import HydroStatus from "@/ElementalStatuses/List/HydroStatus";
import CryoStatus from "@/ElementalStatuses/List/CryoStatus";
import ElectroStatus from "@/ElementalStatuses/List/ElectroStatus";
import VaporizeReaction from "@/ElementalReactions/List/VaporizeReaction";
import ReverseVaporizeReaction from "@/ElementalReactions/List/ReverseVaporizeReaction";
import MeltReaction from "@/ElementalReactions/List/MeltReaction";
import ReverseMeltReaction from "@/ElementalReactions/List/ReverseMeltReaction";
import OverloadedReaction from "@/ElementalReactions/List/OverloadedReaction";
import ElectroChargedReaction from "@/ElementalReactions/List/ElectroChargedReaction";
import FrozenReaction from "@/ElementalReactions/List/FrozenReaction";
import SuperConductReaction from "@/ElementalReactions/List/SuperConductReaction";
import GeoStatus from "@/ElementalStatuses/List/GeoStatus";
import FreezeStatus from "@/ElementalStatuses/List/FreezeStatus";
import CrystallizeReaction from "@/ElementalReactions/List/CrystallizeReaction";
import AnemoStatus from "@/ElementalStatuses/List/AnemoStatus";
import SwirlReaction from "@/ElementalReactions/List/SwirlReaction";
import Entity from "@/Entities/Entity";
import DamageCalculator from "@/Roster/DamageCalculator";
import AmplifyingElementalReaction from "@/ElementalReactions/AmplifyingElementalReaction";
import SingletonsManager from "@/Singletons/SingletonsManager";

type ElementalCombination = [
  first: Constructor<ElementalStatus>,
  second: Constructor<ElementalStatus>,
  result: ElementalReaction,
];

export default class ElementalReactionManager {
  constructor(
    public damageCalculator: DamageCalculator,
  ) {
    this.subscribeAllReactions();
  }

  public onAnyReaction: Listener<IOnReactionArgs> = new Listener<IOnReactionArgs>();

  private elementalCombinations: ElementalCombination[] = this.initCombinations();

  private initCombinations(): ElementalCombination[] {
    return [
      //Amplifying Reactions
      [PyroStatus, HydroStatus, new VaporizeReaction(this)],
      [HydroStatus, PyroStatus, new ReverseVaporizeReaction(this)],
      [CryoStatus, PyroStatus, new MeltReaction(this)],
      [PyroStatus, CryoStatus, new ReverseMeltReaction(this)],
      //Transformative Reactions
      [ElectroStatus, PyroStatus, new OverloadedReaction(this)],
      [PyroStatus, ElectroStatus, new OverloadedReaction(this)],
      [HydroStatus, ElectroStatus, new ElectroChargedReaction(this)],
      [ElectroStatus, HydroStatus, new ElectroChargedReaction(this)],
      [CryoStatus, HydroStatus, new FrozenReaction(this)],
      [HydroStatus, CryoStatus, new FrozenReaction(this)],
      [CryoStatus, ElectroStatus, new SuperConductReaction(this)],
      [ElectroStatus, CryoStatus, new SuperConductReaction(this)],

      //-Freeze Reactions

      //Amplifying Reactions
      [FreezeStatus, PyroStatus, new MeltReaction(this)],
      [PyroStatus, FreezeStatus, new ReverseMeltReaction(this)],
      //Transformative Reactions
      [FreezeStatus, ElectroStatus, new SuperConductReaction(this)],
      [ElectroStatus, FreezeStatus, new SuperConductReaction(this)],
    ];
  }

  private crystallizeReaction: CrystallizeReaction = new CrystallizeReaction(this);
  private swirlReaction: SwirlReaction = new SwirlReaction(this);

  public getReaction(reactionConstructor: Constructor<ElementalReaction>) {
    if (this.crystallizeReaction instanceof reactionConstructor) {
      return this.crystallizeReaction;
    }

    if (this.swirlReaction instanceof reactionConstructor) {
      return this.swirlReaction;
    }

    const combination = this.elementalCombinations.find(c => c[2] instanceof reactionConstructor);

    if (combination) {
      return combination[2];
    }
  }

  //remove freeze status if blunt attack
  public checkShatter(args: IElementalReactionManagerArgs, blunt: boolean) {
    if (!blunt) return;
    args.entity.ongoingEffects = args.entity.ongoingEffects.filter((e) => !(e instanceof FreezeStatus));
  }

  //TODO: Remove status after reaction
  public applyReaction(args: IElementalReactionManagerArgs): number {
    let {elementalStatus, entity, character, damage} = args;
    const enemyStatuses = entity.ongoingEffects.filter((e) => e instanceof ElementalStatus) as ElementalStatus[];
    const hasFreeze = enemyStatuses.find(s => s instanceof FreezeStatus);

    if (!elementalStatus) {
      //TODO: physical reactions
      return damage;
    }

    //add status if it doesn't exists
    if (!enemyStatuses.length) {
      this.addStatus(entity, elementalStatus);
      return damage;
    }

    for (let enemyStatus of enemyStatuses) {
      const ignoreReaction = Boolean(hasFreeze && !(enemyStatus instanceof FreezeStatus));
      const reactionArgs: IElementalReactionArgs = {
        ...args,
        source: args.source ?? args.character,
        aura: enemyStatus,
        trigger: elementalStatus,
        ignoreReaction,
      };


      //override status if they're same
      if (this.tryToOverrideStatus(elementalStatus, enemyStatus, entity)) {
        continue;
      }

      //override status if they're same but duration is different
      if (this.tryToRefillStatus(elementalStatus, enemyStatus, entity)) {
        continue;
      }

      //Reactions

      if (elementalStatus instanceof GeoStatus) {
        this.removeStatus(entity, GeoStatus);
        this.crystallizeReaction.execute(reactionArgs);
        continue;
      }

      if (elementalStatus instanceof AnemoStatus) {
        this.removeStatus(entity, AnemoStatus);
        this.swirlReaction.execute(reactionArgs);
        continue;
      }

      const combination = this.elementalCombinations.find((c) => {
        const [first, second] = c;
        return enemyStatus instanceof first && elementalStatus instanceof second;
      });

      if (combination) {
        const [,,reaction] = combination;
        reaction.execute(reactionArgs);
      }
    }

    return damage;
  }

  public tryToOverrideStatus(skillStatus: ElementalStatus, enemyStatus: ElementalStatus, entity: Entity): boolean {
    if (
      enemyStatus.name === skillStatus.name
      && enemyStatus.units === skillStatus.units
    ) {
      enemyStatus.reactivate(entity);
      return true;
    }

    return false;
  }

  public tryToRefillStatus(skillStatus: ElementalStatus, enemyStatus: ElementalStatus, entity: Entity): boolean {
    if (
      enemyStatus.name === skillStatus.name
      && skillStatus.units > enemyStatus.units
    ) {
      enemyStatus.refill(skillStatus, entity);
      return true;
    }

    return false;
  }

  private subscribeAllReactions() {
    const reactions: ElementalReaction[] = this.elementalCombinations.map(c => c[2]);
    reactions.push(this.crystallizeReaction)
    reactions.push(this.swirlReaction);

    for (let reaction of reactions) {
      reaction.onExecuteListener.subscribe((args) => {
        this.onAnyReaction.notifyAll(args);
      });
    }
  }

  public addStatus(entity: Entity<any>, elementalStatus: ElementalStatus) {
    elementalStatus.activate(entity);
  }

  public removeStatus(entity: Entity<any>, elementalStatus: Constructor<ElementalStatus>) {
    const status = entity.ongoingEffects.find(o => o instanceof  elementalStatus);

    if (status) {
      status.deactivate(entity);
      entity.ongoingEffects.filter(e => !(e instanceof elementalStatus));
    }
  }

  public reset() {
    this.elementalCombinations = this.initCombinations();
  }
}
