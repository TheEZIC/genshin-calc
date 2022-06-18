import BlackcliffPole from "@/Lists/Weapons/Polearms/BlackcliffPole";

describe("test weapon", () => {
  test("weapon base stat", () => {
    const weapon = new BlackcliffPole();

    expect(weapon.baseATK.value).toBeCloseTo(42, 1);

    weapon.applyLvl(1);
    expect(weapon.baseATK.value).toBeCloseTo(42, 1);

    weapon.applyLvl(2);
    expect(weapon.baseATK.value).toBeCloseTo(45.5, 1);

    weapon.applyLvl(5);
    expect(weapon.baseATK.value).toBeCloseTo(56.1, 1);

    weapon.applyLvl(10);
    expect(weapon.baseATK.value).toBeCloseTo(73.7, 1);

    weapon.applyLvl(15);
    expect(weapon.baseATK.value).toBeCloseTo(91.4, 1);

    weapon.applyLvl(20);
    expect(weapon.baseATK.value).toBeCloseTo(109, 1);

    weapon.applyLvl(25);
    expect(weapon.baseATK.value).toBeCloseTo(152.5, 1);

    weapon.applyLvl(85);
    expect(weapon.baseATK.value).toBeCloseTo(492.5, 1);
  });
})
