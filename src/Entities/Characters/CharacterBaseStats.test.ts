import RefreshManager from "@/Refresher/RefreshManager";
import SingletonsManager from "@/Singletons/SingletonsManager";
import Ayaka from "@/Lists/Charaters/Ayaka/Ayaka";

describe("Character base stat test", () => {
  afterEach(() => {
    RefreshManager.refreshAll();
    SingletonsManager.resetAll();
  });

  test("Test multiple lvl applying", () => {
    const character = new Ayaka();

    const testLvlApplying = (lvl: number, expected: number) => {
      character.applyLvl(lvl);
      expect(character.baseStats.baseATK.value).toBeCloseTo(expected);
    }

    testLvlApplying(20, 79);
    let characterAtk1 = character.calculatorStats.ATK.calc();
    testLvlApplying(20, 79);

    testLvlApplying(45, 165.5);
    testLvlApplying(45, 165.5);

    testLvlApplying(20, 79);
    testLvlApplying(20, 79);

    let characterAtk2 = character.calculatorStats.ATK.calc();

    expect(characterAtk1).toBeCloseTo(characterAtk2);
  });
})
