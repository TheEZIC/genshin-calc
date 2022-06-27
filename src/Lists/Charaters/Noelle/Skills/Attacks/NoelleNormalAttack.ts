import NormalAttackSkill from "@/Skills/Defaults/NormalAttackSkill";
import Skill from "@/Skills/Skill";
import NoelleA1 from "@/Lists/Charaters/Noelle/Skills/Attacks/NoelleA1";
import NoelleA2 from "@/Lists/Charaters/Noelle/Skills/Attacks/NoelleA2";
import NoelleA3 from "@/Lists/Charaters/Noelle/Skills/Attacks/NoelleA3";
import NoelleA4 from "@/Lists/Charaters/Noelle/Skills/Attacks/NoelleA4";

export default class NoelleNormalAttack extends NormalAttackSkill {
  public skillName: string = "Favonius Bladework - Maid";
  public attackStages: Skill[] = [
    new NoelleA1(),
    new NoelleA2(),
    new NoelleA3(),
    new NoelleA4(),
  ];
}
