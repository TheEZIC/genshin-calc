import NormalAttackSkill from "@/Skills/NormalAttackSkill";
import Skill from "@/Skills/Skill";
import XianglingA1 from "@/Lists/Charaters/Xiangling/Skills/Attacks/XianglingA1";
import XianglingA2 from "@/Lists/Charaters/Xiangling/Skills/Attacks/XianglingA2";
import XianglingA3 from "@/Lists/Charaters/Xiangling/Skills/Attacks/XianglingA3";
import XianglingA4 from "@/Lists/Charaters/Xiangling/Skills/Attacks/XianglingA4";
import XianglingA5 from "@/Lists/Charaters/Xiangling/Skills/Attacks/XianglingA5";

export default class XianglingNormalAttack extends NormalAttackSkill {
  public skillName: string = "Dough-Fu";

  public attackStages: Skill[] = [
    new XianglingA1(),
    new XianglingA2(),
    new XianglingA3(),
    new XianglingA4(),
    new XianglingA5(),
  ];
}
