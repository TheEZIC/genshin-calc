import Buff from "@/Buffs/Buff";
import SkillsManager from "@/Skills/SkillsManager";
import Character from "@/Characters/Character";

export interface IWithBuffs {
  readonly buffs: Buff[];
  initBuffs(character: Character): void;
  abortBuffs(character: Character): void;
}
