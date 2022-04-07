import Character from "@/Entities/Characters/Character";
import Ayaka from "@/Lists/Charaters/Ayaka/Ayaka";
import Noelle from "@/Lists/Charaters/Noelle/Noelle";
import {container, ContainerBindings} from "@/inversify.config";
import Roster from "@/Roster/Roster";
import Xiangling from "@/Lists/Charaters/Xiangling/Xiangling";

export default class CharactersFactory {
  private roster: Roster = container.get(ContainerBindings.Roster);

  private _characters: Character[] = [
    new Ayaka(),
    new Noelle(),
    new Xiangling(),
  ];

  public getByName(name: string): Character | undefined {
    return this._characters.find(c => c.name.toLowerCase().replace("character", "") === name.toLowerCase());
  }

  public createByName(name: string): Character | undefined {
    const character = this.getByName(name);

    if (character) {
      this.roster.addCharacter(character);
    }

    return character;
  }
}
