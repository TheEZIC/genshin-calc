import DamageCalculator from "@/Roster/DamageCalculator";
import AyakaHoldAttack from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaHoldAttack";
import Ayaka from "@/Lists/Charaters/Ayaka/Ayaka";
import AyakaNormalAttack from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaNormalAttack";
import AyakaA1 from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaA1";
import AyakaA2 from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaA2";
import AyakaA3 from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaA3";
import RefreshManager from "@/Refresher/RefreshManager";
import SingletonsManager from "@/Singletons/SingletonsManager";
import Enemy from "@/Entities/Enemies/Enemy";

describe("AyakaHoldAttack", () => {
  let damageCalculator: DamageCalculator;

  let character: Ayaka;
  let entity: Enemy;

  const A1 = new AyakaA1();
  const A2 = new AyakaA2();
  const A3 = new AyakaA3();

  beforeEach(() => {
    damageCalculator = new DamageCalculator();

    character = new Ayaka();
    entity = new Enemy();

    damageCalculator.roster.addCharacter(character);
    damageCalculator.roster.addEnemy(entity);
  });

  afterEach(() => {
    RefreshManager.refreshAll();
    SingletonsManager.resetAll();
  });

  test("Expect Ayaka hold attack skill with cleared rotation", () => {
    const result = damageCalculator.calcRotationAndFinish([
      new AyakaHoldAttack(),
    ]);

    expect(result.frames).toBe(96);
  });

  test("Expect Ayaka hold attack with 1 attack before", () => {
    const result = damageCalculator.calcRotationAndFinish([
      new AyakaNormalAttack(),
      new AyakaHoldAttack(),
    ]);

    expect(result.frames).toBe(96);
  });

  test("Expect Ayaka hold attack with 2 attack before", () => {
    const result = damageCalculator.calcRotationAndFinish([
      new AyakaNormalAttack(),
      new AyakaNormalAttack(),
      new AyakaHoldAttack(),
    ]);

    expect(result.frames).toBe(115 + A1.frames);
  });

  test("Expect Ayaka hold attack with 3 attack before", () => {
    const result = damageCalculator.calcRotationAndFinish([
      new AyakaNormalAttack(),
      new AyakaNormalAttack(),
      new AyakaNormalAttack(),
      new AyakaHoldAttack(),
    ]);

    expect(result.frames).toBe(140 + A1.frames + A2.frames);
  });

  test("Expect Ayaka hold attack with 4 attack before", () => {
    const result = damageCalculator.calcRotationAndFinish([
      new AyakaNormalAttack(),
      new AyakaNormalAttack(),
      new AyakaNormalAttack(),
      new AyakaNormalAttack(),
      new AyakaHoldAttack(),
    ]);

    expect(result.frames).toBe(171 + A1.frames + A2.frames + A3.frames);
  });

  test("Ayaka hold attack with C6", () => {
    const result1 = damageCalculator.calcRotationAndFinish([
      new AyakaHoldAttack(),
    ]);

    character.constellationsManager.activateConstellation(6);

    const result2 = damageCalculator.calcRotationAndFinish([
      new AyakaHoldAttack(),
    ]);

    expect(result1.damage).toBeLessThan(result2.damage);

    character.constellationsManager.activateConstellation(0);

    const result3 = damageCalculator.calcRotationAndFinish([
      new AyakaHoldAttack(),
    ]);

    expect(result1.damage).toBeCloseTo(result3.damage);
  });
})
