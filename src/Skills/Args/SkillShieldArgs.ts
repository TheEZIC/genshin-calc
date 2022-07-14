import SkillActionArgs, {ISkillActionArgsParams} from "@/Skills/Args/SkillActionArgs";
import Entity from "@/Entities/Entity";
import ShieldEffect from "@/Effects/ShieldEffect";

export interface ISkillShieldArgsParams extends ISkillActionArgsParams {
  shield: ShieldEffect<Entity>;
}

export default class SkillShieldArgs extends SkillActionArgs {
  public readonly shield: ShieldEffect<Entity>;

  constructor(params: ISkillShieldArgsParams) {
    super(params);

    this.shield = params.shield;
  }
}

