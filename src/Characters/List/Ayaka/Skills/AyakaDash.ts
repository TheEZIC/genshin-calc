import DashSkill from "@/Skills/DashSkill";
import Character from "@/Characters/Character";

export default class AyakaDash extends DashSkill {
  frames: number = 20;

  protected override calcDamage(character: Character): number {
    return super.calcDamage(character);
  }
}