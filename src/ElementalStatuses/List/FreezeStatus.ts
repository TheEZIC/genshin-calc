import ElementalStatus from "@/ElementalStatuses/ElementalStatus";
import ElementalReactionManager from "@/ElementalReactions/ElementalReactionManager";
import FrozenReaction from "@/ElementalReactions/List/FrozenReaction";
import Entity from "@/Entities/Entity";
import DamageCalculator from "@/Roster/DamageCalculator";
import {IElementalReactionManagerArgs} from "@/ElementalReactions/ElementalReaction";
import {VisionType} from "@/VisionType";

export default class FreezeStatus extends ElementalStatus {
  public visionType: VisionType = VisionType.Cryo;

  constructor(units: number, private args: IElementalReactionManagerArgs) {
    super(units);
    this._units = units;
    this._framesDuration = this.calcDuration(units);
    this._unitCapacity = this._framesDuration / this._units;
  }

  private get frozenReaction(): FrozenReaction {
    const {reactionsManager} = this.args.damageCalculator;
    return reactionsManager.getReaction(FrozenReaction) as FrozenReaction;
  }

  private calcDuration(units: number): number {
    const lastFrozenFrame = this.frozenReaction.getHistoryFrame(this.args.entity);
    const {currentFrame} = this.args.damageCalculator;

    let duration = 60 * (2 * Math.sqrt(4 + 5 * units) - 4);
    let decayGrow = 60 * 0.1 * ((duration / 60) ** 2) - (currentFrame - lastFrozenFrame);

    if (decayGrow < 0 || lastFrozenFrame === 0) {
      decayGrow = 0;
    }

    duration -= decayGrow;

    return Math.round(duration);
  }
}
