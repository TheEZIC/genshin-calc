import NormalAttackSkill from "@/Skills/Defaults/NormalAttackSkill";
import Skill from "@/Skills/Skill";
import AyakaA1 from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaA1";
import AyakaA2 from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaA2";
import AyakaA3 from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaA3";
import AyakaA4 from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaA4";
import AyakaA5 from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaA5";

export default class AyakaNormalAttack extends NormalAttackSkill {
  public skillName: string = "Kamisato Art: Kabuki";

  public attackStages: Skill[] = [
    new AyakaA1(),
    new AyakaA2(),
    new AyakaA3(),
    new AyakaA4(),
    new AyakaA5(),
  ];
}
