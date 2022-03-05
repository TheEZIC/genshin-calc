import ElementalStatus from "@/ElementalStatuses/ElementalStatus";
import ElementalReaction, {IOnReactionArgs} from "@/ElementalReactions/ElementalReaction";
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
import Listener from "@/Helpers/Listener";
import {injectable} from "inversify";
import DamageCalculator from "@/Roster/DamageCalculator";
import {container} from "@/inversify.config";
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

  private damageCalculator: DamageCalculator = container.get("DamageCalculator");

  public onAnyReaction: Listener<IOnReactionArgs> = new Listener<IOnReactionArgs>();

  private elementalCombinations: ElementalCombination[] = [
    //Amplifying Reactions
    [PyroStatus, HydroStatus, new VaporizeReaction()],
    [HydroStatus, PyroStatus, new ReverseVaporizeReaction()],
    [CryoStatus, PyroStatus, new MeltReaction()],
    [PyroStatus, CryoStatus, new ReverseMeltReaction()],
    //Transformative Reactions
    [ElectroStatus, PyroStatus, new OverloadedReaction()],
    [PyroStatus, ElectroStatus, new OverloadedReaction()],
    [HydroStatus, ElectroStatus, new ElectroChargedReaction()],
    [ElectroStatus, HydroStatus, new ElectroChargedReaction()],
    [CryoStatus, HydroStatus, new FrozenReaction()],
    [HydroStatus, CryoStatus, new FrozenReaction()],
    [CryoStatus, ElectroStatus, new SuperConductReaction()],
    [ElectroStatus, CryoStatus, new SuperConductReaction()],
  ];

  private crystallizeReaction: CrystallizeReaction = new CrystallizeReaction();
  private swirlReaction: SwirlReaction = new SwirlReaction();

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
  public applyReaction(character: Character, entity: Entity<any>, skill: Skill, damage: number): number {
    if (!skill.elementalStatus)
      return damage;

    const skillStatus = skill.elementalStatus as ElementalStatus;
    const enemyStatuses = entity.ongoingEffects.filter((e) => e instanceof ElementalStatus) as ElementalStatus[];

    //add status if it doesn't exists
    if (!enemyStatuses.length) {
      this.addStatus(entity, skill);
      return damage;
    }

    for (let enemyStatus of enemyStatuses) {
      //override status if they're same
      if (
        enemyStatus.name === skillStatus.name
        && enemyStatus.duration === skillStatus.duration
      ) {
        enemyStatus.reactivate(entity);
        continue;
      }

      //override status if they're same but duration is different
      if (
        enemyStatus.name === skillStatus.name
        && skillStatus.units > enemyStatus.units
      ) {
        const newDuration: string = enemyStatus.pureSpeed + Math.max(enemyStatus.units, skillStatus.units);
        const newStatus = skillStatus.clone;
        newStatus.duration = newDuration;

        this.addStatus(entity, skill);

        continue;
      }

      //Reactions

      if (enemyStatus instanceof GeoStatus || skillStatus instanceof GeoStatus) {
        this.removeStatus(entity, GeoStatus);
        enemyStatus.currentFrame += this.crystallizeReaction.triggerMultiplier * enemyStatus.parsedSpeed;
        this.crystallizeReaction.applyBonusDamage(character, skill, damage);
        continue;
      }

      if (enemyStatus instanceof AnemoStatus || skillStatus instanceof AnemoStatus) {
        this.removeStatus(entity, AnemoStatus);
        enemyStatus.currentFrame += this.swirlReaction.triggerMultiplier * enemyStatus.parsedSpeed;
        this.swirlReaction.applyBonusDamage(character, skill, damage);
        continue;
      }

      const combination = this.elementalCombinations.find((c) => {
        const [first, second] = c;
        this.removeStatus(entity, first);
        return enemyStatus instanceof first && skillStatus instanceof second;
      });

      if (combination) {
        const [,,reaction] = combination;

        if (!(reaction instanceof ElectroChargedReaction)) {
          if (reaction instanceof MultipliedElementalReaction) {
            enemyStatus.currentFrame += reaction.triggerMultiplier * enemyStatus.parsedSpeed;
            damage += reaction.applyBonusDamage(character, skill, damage);
          }
        } else {
          this.addStatus(entity, skill);

          const remainingDuration = enemyStatus.framesDuration - enemyStatus.currentFrame;
          const statusDecay = reaction.triggerMultiplier * enemyStatus.parsedSpeed + 1

          let ticksCount = (remainingDuration / 60) / (statusDecay);

          if (ticksCount % 1 * statusDecay > 0.5) {
            ticksCount++;
          }

          ticksCount = Math.floor(ticksCount);

          for (let i = 0; i < ticksCount; i++) {
            this.damageCalculator.addAction({
              delay: 60 * i,
              run: (damageCalculator) => {
                const electroStatus = character.ongoingEffects.find(e => e instanceof ElectroStatus);
                const hydroStatus = character.ongoingEffects.find(e => e instanceof HydroStatus);

                if (electroStatus && hydroStatus) {
                  electroStatus.currentFrame += reaction.triggerMultiplier * enemyStatus.parsedSpeed;
                  hydroStatus.currentFrame += reaction.triggerMultiplier * enemyStatus.parsedSpeed;

                  damageCalculator.rotationDmg += reaction.applyBonusDamage(character, skill, damage);
                }
              }
            });
          }
        }
      }
    }

    return damage;
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

  private addStatus(entity: Entity<any>, skill: Skill) {
    if (entity instanceof Enemy) {
      entity.effectManager.addEffect(skill.elementalStatus!!.activate(entity));
    }
  }

  private removeStatus(entity: Entity<any>, status: Constructor<ElementalStatus>) {
    entity.ongoingEffects.filter(e => !(e instanceof status));
  }
}
