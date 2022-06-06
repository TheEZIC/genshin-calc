import ElementalReaction, {IElementalReactionArgs} from "@/ElementalReactions/ElementalReaction";
import CryoStatus from "@/ElementalStatuses/List/CryoStatus";
import HydroStatus from "@/ElementalStatuses/List/HydroStatus";
import DamageCalculator from "@/Roster/DamageCalculator";
import FreezeStatus from "@/ElementalStatuses/List/FreezeStatus";
import Entity from "@/Entities/Entity";
import ElementalReactionManager from "@/ElementalReactions/ElementalReactionManager";
import GlobalListeners from "@/Roster/GlobalListeners";
import {RefreshableClass} from "@/Refresher/RefreshableClass";
import {RefreshableProperty} from "@/Refresher/RefreshableProperty";

interface IFrozenHistoryItem {
  entity: Entity;
  frame: number;
}

@RefreshableClass
export default class FrozenReaction extends ElementalReaction {
  private damageCalculator: DamageCalculator = DamageCalculator.instance;
  private globalListeners: GlobalListeners = GlobalListeners.instance;

  constructor(elementalReactionManager: ElementalReactionManager) {
    super(elementalReactionManager);
    this.subscribeFreeze();
  }

  public triggerMultiplier: number = 1.25;

  //TODO: move history to reaction manager
  @RefreshableProperty([])
  private _history: IFrozenHistoryItem[] = [];

  private addHistoryFrame(entity: Entity) {
    this._history.push({
      entity,
      frame: this.damageCalculator.currentFrame,
    });
  }

  public getHistoryFrame(entity: Entity): number {
    const historyItem = this._history.find(h => h.entity === entity);
    return historyItem?.frame ?? 0;
  }

  public applyBonusDamage(args: IElementalReactionArgs): number {
    if (!args.elementalStatus) return 0;

    let cryoStatus;
    let hydroStatus;

    const entityStatuses = args.entity.elementalStatuses;
    const potentialCryo = entityStatuses.find(s => s instanceof CryoStatus);
    const potentialHydro = entityStatuses.find(s => s instanceof HydroStatus);

    if (potentialCryo) {
      cryoStatus = potentialCryo;
      hydroStatus = args.elementalStatus;
    } else if (potentialHydro) {
      hydroStatus = potentialHydro;
      cryoStatus = args.elementalStatus;
    } else return 0;

    const freezeUnits = 2 * Math.min(cryoStatus.remainingUnits, hydroStatus.units);
    const status = new FreezeStatus(freezeUnits, args.entity);

    status.activate(args.entity);

    return 0;
  }

  private subscribeFreeze() {
    this.globalListeners.onEffectEnded.subscribe(e => {
      if (e.effect instanceof FreezeStatus) {
        this.addHistoryFrame(e.entity);
      }
    });
  }
}
