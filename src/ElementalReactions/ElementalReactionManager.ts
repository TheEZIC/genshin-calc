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
import DamageCalculator from "@/Roster/DamageCalculator";
import Roster from "@/Roster/Roster";
import Listener from "@/Helpers/Listener";
import {injectable} from "inversify";

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

  private removeStatus(entity: Entity<any>, status: Constructor<ElementalStatus>) {
    entity.ongoingEffects.filter(e => !(e instanceof status));
  }

  //TODO: Remove status after reaction
  public applyReaction(character: Character, entity: Entity<any>, skill: Skill, damage: number): number {
    if (!skill.elementalStatus)
      return damage;

    const enemyStatus = entity.ongoingEffects.find((e) => e instanceof ElementalStatus);

    if (!enemyStatus) {
      if (entity instanceof Enemy) {
        entity.effectManager.addEffect(skill.elementalStatus);
      }
      return damage;
    }

    if (enemyStatus instanceof GeoStatus || skill.elementalStatus instanceof GeoStatus) {
      this.removeStatus(entity, GeoStatus);
      return this.crystallizeReaction.applyBonusDamage(character, skill, damage);
    }

    if (enemyStatus instanceof AnemoStatus || skill.elementalStatus instanceof AnemoStatus) {
      this.removeStatus(entity, AnemoStatus);
      return this.swirlReaction.applyBonusDamage(character, skill, damage);
    }

    const combination = this.elementalCombinations.find((c) => {
      const [first, second] = c;
      this.removeStatus(entity, first);
      return enemyStatus instanceof first && skill.elementalStatus instanceof second;
    });

    if (combination) {
      const [,,reaction] = combination;
      return reaction.applyBonusDamage(character, skill, damage);
    }

    return damage;
  }
}
