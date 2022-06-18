import {VisionType} from "@/VisionType";
import Character from "@/Entities/Characters/Character";
import {StatValue} from "@/Entities/Characters/CalculatorStats/Types/StatValue";
import Skill from "@/Skills/Skill";
import {SkillType} from "@/Skills/SkillType";

export interface ISKillInfusionItem {
  element: VisionType;
  zIndex: number;
}

export default class SkillInfusion {
  constructor(
    private skill: Skill,
  ) {
  }

  private infusions: ISKillInfusionItem[] = [];

  public get active(): VisionType | undefined {
    const [activeItem] = this.infusions.sort((a, b) => b.zIndex - a.zIndex);
    return activeItem?.element;
  }

  public add(infusionItem: ISKillInfusionItem) {
    const exist = this.infusions.find(infusion =>
      infusion.element === infusionItem.element &&
      infusion.zIndex === infusionItem.zIndex
    );

    if (!exist) {
      this.infusions.push(infusionItem);
    }
  }

  public remove(infusionItem: ISKillInfusionItem) {
    this.infusions = this.infusions.filter(infusion =>
      infusion.element !== infusionItem.element &&
      infusion.zIndex !== infusionItem.zIndex
    );
  }

  private tempBonus: StatValue | null = null;

  public applyBonus(character: Character): void {
    if (this.tempBonus) {
      return;
    }

    const dmgBonus = this.active
      ? character.calculatorStats.getElementalDmgBonus(this.active)
      : character.calculatorStats.getPhysicalDmgBonus();

    const statValue = new StatValue(dmgBonus);
    character.calculatorStats.ATK.affixes.add(statValue);
    this.tempBonus = statValue;
  }

  public removeBonus(character: Character): void {
    if (!this.tempBonus) {
      return;
    }

    character.calculatorStats.ATK.affixes.remove(this.tempBonus);
    this.tempBonus = null;
  }

  public clearBonus() {
    this.tempBonus = null;
  }
}
