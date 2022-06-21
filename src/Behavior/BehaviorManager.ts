import BehaviorUnit from "@/Behavior/BehaviorUnit";
import DamageCalculator from "@/Roster/DamageCalculator";
import IBaseArgs from "@/IBaseArgs";

interface IBehaviourUnitItem {
  unit: BehaviorUnit;
  args: IBaseArgs;
}

export default class BehaviorManager {
  constructor(
    private damageCalculator: DamageCalculator,
  ) {
  }

  private _behaviorUnits: IBehaviourUnitItem[] = [];

  public get behaviourUnits(): IBehaviourUnitItem[] {
    return this._behaviorUnits;
  }

  public add(behaviourUnit: BehaviorUnit, args: IBaseArgs) {
    this.behaviourUnits.push({
      unit: behaviourUnit,
      args,
    });
  }

  public remove(behaviourUnit: BehaviorUnit) {
    const index = this.behaviourUnits.findIndex(item => item.unit === behaviourUnit);

    if (index !== -1) {
      this._behaviorUnits.splice(index, 1);
    }
  }

  public updateAll() {
    for (let item of this.behaviourUnits) {
      const {unit, args} = item;
      unit.update(args);
    }
  }

  public get remainingFrames() {
    const remainingFrames = this.behaviourUnits.map(item => item.unit.remainingFrames);
    return Math.max(...remainingFrames);
  }
}
