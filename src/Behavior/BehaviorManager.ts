import BehaviorUnit from "@/Behavior/BehaviorUnit";
import DamageCalculator from "@/Roster/DamageCalculator";

export default class BehaviorManager {
  constructor(
    private damageCalculator: DamageCalculator,
  ) {
  }

  private _behaviorUnits: BehaviorUnit[] = [];

  public get behaviourUnits(): BehaviorUnit[] {
    return this._behaviorUnits;
  }

  public add(behaviourUnit: BehaviorUnit) {
    this.behaviourUnits.push(behaviourUnit);
  }

  public remove(behaviourUnit: BehaviorUnit) {
    const index = this.behaviourUnits.indexOf(behaviourUnit);

    if (index !== -1) {
      this._behaviorUnits.splice(index);
    }
  }

  public updateAll() {
    for (let unit of this.behaviourUnits) {
     unit.update({
       damageCalculator: this.damageCalculator
     });
    }
  }
}
