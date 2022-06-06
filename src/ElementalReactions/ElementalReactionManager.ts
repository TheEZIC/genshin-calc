import Listener from "@/Helpers/Listener";
import ElementalStatus from "@/ElementalStatuses/ElementalStatus";
import ElementalReaction, {IElementalReactionArgs, IOnReactionArgs} from "@/ElementalReactions/ElementalReaction";
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
import MultipliedElementalReaction from "@/ElementalReactions/MultipliedElementalReaction";
import SingletonsManager from "@/Singletons/SingletonsManager";

type ElementalCombination = [
  first: Constructor<ElementalStatus>,
  second: Constructor<ElementalStatus>,
  result: ElementalReaction,
];


export default class ElementalReactionManager {
  private static _instance: ElementalReactionManager | null = null;

  public static get instance() {
    if (!this._instance) {
      this._instance = new this();
      SingletonsManager.addSingleton(this._instance);
    }

    return this._instance;
  }

  constructor(
  ) {
    this.subscribeAllReactions();
  }

  private damageCalculator: DamageCalculator = DamageCalculator.instance;

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
  public checkShatter(args: IElementalReactionArgs, blunt: boolean) {
    if (!blunt) return;
    args.entity.ongoingEffects = args.entity.ongoingEffects.filter((e) => !(e instanceof FreezeStatus));
  }

  //TODO: Remove status after reaction
  public applyReaction(args: IElementalReactionArgs): number {
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
      const ignoreReaction = hasFreeze && !(enemyStatus instanceof FreezeStatus);
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
        if (!ignoreReaction) this.crystallizeReaction.execute(args);
        enemyStatus.react(elementalStatus, this.crystallizeReaction);
        continue;
      }

      if (elementalStatus instanceof AnemoStatus) {
        this.removeStatus(entity, AnemoStatus);
        if (!ignoreReaction) this.swirlReaction.execute(args);
        enemyStatus.react(elementalStatus, this.swirlReaction);
        continue;
      }

      const combination = this.elementalCombinations.find((c) => {
        const [first, second] = c;
        return enemyStatus instanceof first && elementalStatus instanceof second;
      });

      if (combination) {
        const [,,reaction] = combination;

        if (reaction instanceof ElectroChargedReaction) {
          this.addStatus(entity, elementalStatus);

          const {triggerMultiplier} = reaction;
          const unitCapacity = Math.min(enemyStatus.unitCapacity, elementalStatus.unitCapacity);
          const remainingDuration = Math.min(enemyStatus.remainingDuration, elementalStatus.remainingDuration);
          const remainingDurationAfterFirstTick = remainingDuration - triggerMultiplier *  unitCapacity;

          let ticksCount = Math.floor(remainingDurationAfterFirstTick  / (triggerMultiplier  * unitCapacity + 60)) + 1;

          if (remainingDurationAfterFirstTick % (triggerMultiplier  * unitCapacity + 60) > 30) {
            ticksCount++;
          }

          for (let i = 0; i < ticksCount; i++) {
            this.damageCalculator.addAction({
              delay: 60 * i,
              run: (damageCalculator) => {
                const electroStatus = entity.ongoingEffects.find(e => e instanceof ElectroStatus) as ElectroStatus;
                const hydroStatus = entity.ongoingEffects.find(e => e instanceof HydroStatus) as HydroStatus;

                if (electroStatus && hydroStatus) {
                  electroStatus.react(electroStatus, reaction, true);
                  hydroStatus.react(hydroStatus, reaction, true);

                  damageCalculator.rotationDamage += reaction.execute(args);
                }
              }
            });
          }

          return damage;
        }

        const reactedDamage = !ignoreReaction ? reaction.execute(args) : 0;
        enemyStatus.react(elementalStatus, reaction);
        damage += reaction instanceof MultipliedElementalReaction
          ? reactedDamage - damage
          : reactedDamage;
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
