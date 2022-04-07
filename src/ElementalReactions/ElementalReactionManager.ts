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
import Enemy from "@/Entities/Enemies/Enemy";
import Character from "@/Entities/Characters/Character";
import GeoStatus from "@/ElementalStatuses/List/GeoStatus";
import CrystallizeReaction from "@/ElementalReactions/List/CrystallizeReaction";
import AnemoStatus from "@/ElementalStatuses/List/AnemoStatus";
import SwirlReaction from "@/ElementalReactions/List/SwirlReaction";
import Skill from "@/Skills/Skill";
import Entity from "@/Entities/Entity";
import {injectable} from "inversify";
import DamageCalculator from "@/Roster/DamageCalculator";
import {container, ContainerBindings} from "@/inversify.config";
import MultipliedElementalReaction from "@/ElementalReactions/MultipliedElementalReaction";

type ElementalCombination = [
  first: Constructor<ElementalStatus>,
  second: Constructor<ElementalStatus>,
  result: ElementalReaction,
];


@injectable()
export default class ElementalReactionManager {
  constructor(
  ) {
    this.subscribeAllReactions();
  }

  private damageCalculator: DamageCalculator = container.get(ContainerBindings.DamageCalculator);

  public onAnyReaction: Listener<IOnReactionArgs> = new Listener<IOnReactionArgs>();

  private elementalCombinations: ElementalCombination[] = [
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
  ];

  private crystallizeReaction: CrystallizeReaction = new CrystallizeReaction(this);
  private swirlReaction: SwirlReaction = new SwirlReaction(this);

  public getReaction(reactionConstructor: Constructor<ElementalReaction>) {
    if (this.crystallizeReaction instanceof reactionConstructor) {
      return this.crystallizeReaction;
    }

    if (this.swirlReaction instanceof reactionConstructor) {
      return this.swirlReaction;
    }

    return this.elementalCombinations.find(c => c[2] instanceof reactionConstructor);
  }

  //TODO: Remove status after reaction
  public applyReaction(args: IElementalReactionArgs): number {
    let {elementalStatus, entity, character, damage} = args;
    const enemyStatuses = entity.ongoingEffects.filter((e) => e instanceof ElementalStatus) as ElementalStatus[];

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
      //override status if they're same
      if (this.tryToOverrideStatus(elementalStatus, enemyStatus, entity)) {
        continue;
      }

      //override status if they're same but duration is different
      if (this.tryToRefillStatus(elementalStatus, enemyStatus, entity)) {
        continue;
      }

      //Reactions

      if (enemyStatus instanceof GeoStatus || elementalStatus instanceof GeoStatus) {
        this.removeStatus(entity, GeoStatus);
        enemyStatus.currentFrame += Math.round(this.crystallizeReaction.triggerMultiplier * enemyStatus.parsedDecay * elementalStatus.units);
        this.crystallizeReaction.applyBonusDamage(args);
        continue;
      }

      if (elementalStatus instanceof AnemoStatus) {
        this.removeStatus(entity, AnemoStatus);
        enemyStatus.currentFrame += Math.round(this.swirlReaction.triggerMultiplier * enemyStatus.parsedDecay * elementalStatus.units);
        this.swirlReaction.applyBonusDamage(args);
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

          const remainingDuration = enemyStatus.framesDuration - enemyStatus.currentFrame;
          const statusDecay = reaction.triggerMultiplier * (enemyStatus.parsedDecay / 60) + 1

          let ticksCount = (remainingDuration / 60) / statusDecay;

          if (ticksCount % 1 * statusDecay > 0.5) {
            ticksCount++;
          }

          ticksCount = Math.floor(ticksCount);

          for (let i = 0; i < ticksCount; i++) {
            this.damageCalculator.addAction({
              delay: 60 * i,
              run: (damageCalculator) => {
                const electroStatus = entity.ongoingEffects.find(e => e instanceof ElectroStatus) as ElectroStatus;
                const hydroStatus = entity.ongoingEffects.find(e => e instanceof HydroStatus) as HydroStatus;

                if (electroStatus && hydroStatus) {
                  electroStatus.currentFrame += reaction.triggerMultiplier * (electroStatus.parsedDecay);
                  hydroStatus.currentFrame += reaction.triggerMultiplier * (hydroStatus.parsedDecay);

                  damageCalculator.rotationDamage += reaction.applyBonusDamage(args);
                }
              }
            });
          }

          return damage;
        }

        enemyStatus.currentFrame += Math.round(reaction.triggerMultiplier * enemyStatus.parsedDecay * elementalStatus.units);
        damage += reaction.applyBonusDamage(args) - damage;
      }
    }

    return damage;
  }

  public tryToOverrideStatus(skillStatus: ElementalStatus, enemyStatus: ElementalStatus, entity: Entity): boolean {
    if (
      enemyStatus.name === skillStatus.name
      && enemyStatus.duration === skillStatus.duration
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
      const newDuration: string = enemyStatus.pureDecay + Math.max(enemyStatus.units, skillStatus.units);
      const newStatus = skillStatus.clone;
      newStatus.duration = newDuration;

      this.addStatus(entity, skillStatus);

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
    if (entity instanceof Enemy) {
      entity.effectManager.addEffect(elementalStatus.activate(entity));
    }
  }

  public removeStatus(entity: Entity<any>, status: Constructor<ElementalStatus>) {
    entity.ongoingEffects.filter(e => !(e instanceof status));
  }
}
