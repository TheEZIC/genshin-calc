import ArtifactSet from "@/Artifacts/ArtifactSet";
import { StatValue } from "@/CalculatorStats/StatValue";
import Character from "@/Entities/Characters/Character";

export default class TinyMiracleSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute TinyMiracle 2");
    character.calculatorStats.hydroResistance.additionalValues.add(
      new StatValue(20)
    );
    character.calculatorStats.pyroResistance.additionalValues.add(
      new StatValue(20)
    );
    character.calculatorStats.dendroResistance.additionalValues.add(
      new StatValue(20)
    );
    character.calculatorStats.cryoResistance.additionalValues.add(
      new StatValue(20)
    );
    character.calculatorStats.electroResistance.additionalValues.add(
      new StatValue(20)
    );
    character.calculatorStats.geoResistance.additionalValues.add(
      new StatValue(20)
    );
    character.calculatorStats.anemoResistance.additionalValues.add(
      new StatValue(20)
    );
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute TinyMiracle 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove TinyMiracle 2");
    character.calculatorStats.hydroResistance.additionalValues.remove(
      new StatValue(20)
    );
    character.calculatorStats.pyroResistance.additionalValues.remove(
      new StatValue(20)
    );
    character.calculatorStats.dendroResistance.additionalValues.remove(
      new StatValue(20)
    );
    character.calculatorStats.cryoResistance.additionalValues.remove(
      new StatValue(20)
    );
    character.calculatorStats.electroResistance.additionalValues.remove(
      new StatValue(20)
    );
    character.calculatorStats.geoResistance.additionalValues.remove(
      new StatValue(20)
    );
    character.calculatorStats.anemoResistance.additionalValues.remove(
      new StatValue(20)
    );
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove TinyMiracle 4");
  }
}
