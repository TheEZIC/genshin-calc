import CharacterAscendableBaseStat from "./CharacterAscendableBaseStat";
import Character from "../Character";
import CharacterBaseStat from "./CharacterBaseStat";

export default abstract class CharacterAscendableBaseStats {
  constructor(
    public chapter: Character
  ) {
  }

  public abstract readonly baseHP: CharacterBaseStat;
  public readonly percentHP: CharacterAscendableBaseStat = new CharacterAscendableBaseStat(0);

  public abstract readonly baseATK: CharacterBaseStat;
  public readonly percentATK: CharacterAscendableBaseStat = new CharacterAscendableBaseStat(0);

  public abstract baseDEF: CharacterBaseStat;
  public readonly percentDEF: CharacterAscendableBaseStat = new CharacterAscendableBaseStat(0);

  /*public readonly critChance: CharacterAscendableBaseStat = new CharacterAscendableBaseStat(5);
  public readonly critDamage: CharacterAscendableBaseStat = new CharacterAscendableBaseStat(50);

  public readonly physicalDmgBonus: CharacterAscendableBaseStat = new CharacterAscendableBaseStat(0);
  public readonly pyroDmgBonus: CharacterAscendableBaseStat = new CharacterAscendableBaseStat(0);
  public readonly hydroDmgBonus: CharacterAscendableBaseStat = new CharacterAscendableBaseStat(0);
  public readonly anemoDmgBonus: CharacterAscendableBaseStat = new CharacterAscendableBaseStat(0);
  public readonly electroDmgBonus: CharacterAscendableBaseStat = new CharacterAscendableBaseStat(0);
  public readonly dendroDmgBonus: CharacterAscendableBaseStat = new CharacterAscendableBaseStat(0);
  public readonly cryoDmgBonus: CharacterAscendableBaseStat = new CharacterAscendableBaseStat(0);
  public readonly geoDmgBonus: CharacterAscendableBaseStat = new CharacterAscendableBaseStat(0);

  public readonly physicalResistance: CharacterAscendableBaseStat = new CharacterAscendableBaseStat(0);
  public readonly pyroResistance: CharacterAscendableBaseStat = new CharacterAscendableBaseStat(0);
  public readonly hydroResistance: CharacterAscendableBaseStat = new CharacterAscendableBaseStat(0);
  public readonly anemoResistance: CharacterAscendableBaseStat = new CharacterAscendableBaseStat(0);
  public readonly electroResistance: CharacterAscendableBaseStat = new CharacterAscendableBaseStat(0);
  public readonly dendroResistance: CharacterAscendableBaseStat = new CharacterAscendableBaseStat(0);
  public readonly cryoResistance: CharacterAscendableBaseStat = new CharacterAscendableBaseStat(0);
  public readonly geoResistance: CharacterAscendableBaseStat = new CharacterAscendableBaseStat(0);

  public readonly elementalMastery: CharacterAscendableBaseStat = new CharacterAscendableBaseStat(0);
  public readonly energyRecharge: CharacterAscendableBaseStat = new CharacterAscendableBaseStat(0);*/

  public applyLvl(lvl: number): this {
    Object.entries(this).map(([key, value]) => {
      const isStat = CharacterBaseStat.isInstanceOf(value);

      if (isStat) {
        const stat = value as CharacterBaseStat;
        stat.applyLvl(lvl);
      }
    });

    return this;
  }

  public app(callback: (stats: this) => void): this {
    callback(this);
    return this;
  }
}