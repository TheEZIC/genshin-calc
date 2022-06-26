import { SkillType } from "@/Skills/SkillType";

export class StatValue {
  constructor(public value: number, public skillFilters?: SkillType[]) {}
}
