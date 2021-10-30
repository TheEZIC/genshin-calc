import CharacterAscendableBaseStat from "./CharacterAscendableBaseStat";
import Character from "./Character";
import BaseStat from "../BaseStats/BaseStat";

export default abstract class CharacterAscendableBaseStats {
  constructor(
    public chapter: Character
  ) {
  }

  public abstract readonly baseHP: BaseStat;
  public readonly percentHP: CharacterAscendableBaseStat = new CharacterAscendableBaseStat(0);

  public abstract readonly baseATK: BaseStat;
  public readonly percentATK: CharacterAscendableBaseStat = new CharacterAscendableBaseStat(0);

  public abstract baseDEF: BaseStat;
  public readonly percentDEF: CharacterAscendableBaseStat = new CharacterAscendableBaseStat(0);

  public readonly elementalMastery: CharacterAscendableBaseStat = new CharacterAscendableBaseStat(0);
  public readonly energyRecharge: CharacterAscendableBaseStat = new CharacterAscendableBaseStat(0);

  public readonly critChance: CharacterAscendableBaseStat = new CharacterAscendableBaseStat(5);
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

  /**
   * Apply lvl to all character stats
   * @param {number} lvl - lvl of character
   * */
  public applyLvl(lvl: number): this {
    Object.entries(this).map(([key, value]) => {
      const isStat = value instanceof BaseStat;

      if (isStat) {
        const stat = value as BaseStat;
        stat.applyLvl(lvl);
      }
    });

    return this;
  }

  /**
   * Apply lvl to all character stats
   * @param {function} callback - callback function to modify stats
   * */
  public apply(callback: (stats: this) => void): this {
    callback(this);
    return this;
  }
}