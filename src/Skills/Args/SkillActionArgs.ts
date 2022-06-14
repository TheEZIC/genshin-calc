import SkillArgs, {ISkillArgsParams} from "@/Skills/Args/SkillArgs";

export interface ISkillActionArgsParams extends ISkillArgsParams {
  value: number;
}

export default class SkillActionArgs extends SkillArgs {
  public readonly value: number;

  constructor(params: ISkillActionArgsParams) {
    super(params);
    this.value = params.value;
  }
}
