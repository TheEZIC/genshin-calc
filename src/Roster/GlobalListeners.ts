import Listener from "@/Helpers/Listener";
import Character from "@/Entities/Characters/Character";
import Skill from "@/Skills/Skill";
import {injectable} from "inversify";

export interface IOnCharacterAction {
  character: Character;
  skill: Skill;
  value: number;
}

@injectable()
export default class GlobalListeners {
  onDamage: Listener<IOnCharacterAction> = new Listener<IOnCharacterAction>();
  onHeal: Listener<IOnCharacterAction> = new Listener<IOnCharacterAction>();
  onCreateShield: Listener<IOnCharacterAction> = new Listener<IOnCharacterAction>();
}
