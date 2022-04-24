import {VisionType} from "@/VisionType";
import Character from "@/Entities/Characters/Character";
import {StatValue} from "@/Entities/Characters/CalculatorStats/Types/StatValue";

export interface ISKillInfusionItem {
  element: VisionType;
  zIndex: number;
}

export default class SkillInfusion {
  private infusions: ISKillInfusionItem[] = [];

  public get active(): VisionType | undefined {
    const [activeItem] = this.infusions.sort((a, b) => b.zIndex - a.zIndex);
    return activeItem?.element;
  }

  public add(infusionItem: ISKillInfusionItem) {
    this.infusions.push(infusionItem);
  }

  public remove(infusionItem: ISKillInfusionItem) {
    this.infusions = this.infusions.filter(infusion =>
      infusion.element !== infusionItem.element &&
      infusion.zIndex !== infusionItem.zIndex
    );
  }

  public applyBonus(character: Character): StatValue {
    const dmgBonus = this.active
      ? character.calculatorStats.getElementalDmgBonus(this.active)
      : character.calculatorStats.getPhysicalDmgBonus();

    const statValue = new StatValue(dmgBonus);
    character.calculatorStats.ATK.affixes.add(statValue);

    return statValue;
  }

  public removeBonus(character: Character, statValue: StatValue) {
    character.calculatorStats.ATK.affixes.remove(statValue);
  }
}
