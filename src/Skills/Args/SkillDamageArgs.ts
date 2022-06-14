import SkillActionArgs, {ISkillActionArgsParams} from "@/Skills/Args/SkillActionArgs";
import ElementalStatus from "@/ElementalStatuses/ElementalStatus";

export interface ISkillDamageArgsParams extends ISkillActionArgsParams {
  elementalStatus?: ElementalStatus;
  blunt?: boolean;
  multiplier?: number;
  hits?: number;
}

export default class SkillDamageArgs extends SkillActionArgs {
  public readonly elementalStatus: ElementalStatus | undefined;
  public readonly blunt: boolean | undefined;
  public readonly multiplier: number | undefined;
  public readonly hits: number | undefined;

  constructor(params: ISkillDamageArgsParams) {
    super(params);

    this.elementalStatus = params.elementalStatus;
    this.blunt = params.blunt;
    this.multiplier = params.multiplier;
    this.hits = params.hits;
  }
}
