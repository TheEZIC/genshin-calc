import ElementalStatus from "@/ElementalStatuses/ElementalStatus";
import ElementalReaction from "@/ElementalReactions/ElementalReaction";
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
import Enemy from "@/Enemies/Enemy";
import Character from "@/Characters/Character";
import GeoStatus from "@/ElementalStatuses/List/GeoStatus";
import CrystallizeReaction from "@/ElementalReactions/List/CrystallizeReaction";
import AnemoStatus from "@/ElementalStatuses/List/AnemoStatus";
import SwirlReaction from "@/ElementalReactions/List/SwirlReaction";

type ElementalCombination = [
  first: Constructor<ElementalStatus>,
  second: Constructor<ElementalStatus>,
  result: ElementalReaction,
];

export default class ElementalReactionManager {
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

  public getReactionBonusDamage(character: Character, enemy: Enemy, damage: number, currentAttackStatus: ElementalStatus) {
    const enemyStatus = enemy.ongoingEffects.find((e) => {
      return e instanceof ElementalStatus;
    });

    if (!enemyStatus) {
      enemy.effectManager.addEffect(currentAttackStatus);
      return damage;
    }

    if (enemyStatus instanceof GeoStatus || currentAttackStatus instanceof GeoStatus) {
      return this.crystallizeReaction.calcBonusDamage(character, damage);
    }

    if (enemyStatus instanceof AnemoStatus || currentAttackStatus instanceof AnemoStatus) {
      return this.swirlReaction.calcBonusDamage(character, damage);
    }

    const combination = this.elementalCombinations.find((c) => {
      const [first, second] = c;
      return enemyStatus instanceof first && currentAttackStatus instanceof second;
    });

    if (combination) {
      const [,,reaction] = combination;
      return reaction.calcBonusDamage(character, damage);
    }

    return damage;
  }
}
