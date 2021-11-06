import ArtifactSet from "@/Artifacts/ArtifactSet";
import { StatValue } from "@/Characters/CalculatorStats/Types/StatValue";
import Character from "@/Characters/Character";

export default class TinyMiracleSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute TinyMiracle 2");
    character.calculatorStats.hydroResistance.addAdditionalValue(new StatValue(20));
    character.calculatorStats.pyroResistance.addAdditionalValue(new StatValue(20));
    character.calculatorStats.dendroResistance.addAdditionalValue(new StatValue(20));
    character.calculatorStats.cryoResistance.addAdditionalValue(new StatValue(20));
    character.calculatorStats.electroResistance.addAdditionalValue(new StatValue(20));
    character.calculatorStats.geoResistance.addAdditionalValue(new StatValue(20));
    character.calculatorStats.anemoResistance.addAdditionalValue(new StatValue(20));
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute TinyMiracle 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove TinyMiracle 2");
    character.calculatorStats.hydroResistance.removeAdditionalValue(new StatValue(20));
    character.calculatorStats.pyroResistance.removeAdditionalValue(new StatValue(20));
    character.calculatorStats.dendroResistance.removeAdditionalValue(new StatValue(20));
    character.calculatorStats.cryoResistance.removeAdditionalValue(new StatValue(20));
    character.calculatorStats.electroResistance.removeAdditionalValue(new StatValue(20));
    character.calculatorStats.geoResistance.removeAdditionalValue(new StatValue(20));
    character.calculatorStats.anemoResistance.removeAdditionalValue(new StatValue(20));
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove TinyMiracle 4");
  }
}
