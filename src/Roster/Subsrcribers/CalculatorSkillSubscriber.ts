import {ISubscriber} from "@/Helpers/Listener";
import Skill from "@/Skills/Skill";

type OnSkillCallback = (skill: Skill) => void;

export default class CalculatorSkillSubscriber implements ISubscriber<Skill> {
  constructor(
    protected callback: OnSkillCallback,
  ) {
  }

  runOnEvent(args: Skill): void {
    this.callback(args);
  }
}
