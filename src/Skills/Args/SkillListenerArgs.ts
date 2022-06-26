import SkillArgs, {ISkillArgsParams} from "@/Skills/Args/SkillArgs";
import Enemy from "@/Entities/Enemies/Enemy";

export interface ISkillListenerArgsParams extends ISkillArgsParams {
  targets: Enemy[];
}

export default class SkillListenerArgs extends SkillArgs {
  public readonly targets: Enemy[];

  constructor(params: ISkillListenerArgsParams) {
    super(params);
    this.targets = params.targets;
  }
}
