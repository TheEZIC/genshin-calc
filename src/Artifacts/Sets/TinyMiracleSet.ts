import ArtifactSet from "../ArtifactSet";
import Character from "../../Characters/Character";

export default class TinyMiracleSet extends ArtifactSet {
  computeTwoPieceBonuses(character: Character): void {
    console.log("execute TinyMiracle 2");
    character.calculatorStats.hydroResistance.addAdditionalValue(20);
    character.calculatorStats.pyroResistance.addAdditionalValue(20);
    character.calculatorStats.dendroResistance.addAdditionalValue(20);
    character.calculatorStats.cryoResistance.addAdditionalValue(20);
    character.calculatorStats.electroResistance.addAdditionalValue(20);
    character.calculatorStats.geoResistance.addAdditionalValue(20);
    character.calculatorStats.anemoResistance.addAdditionalValue(20);
  }

  computeFourPieceBonuses(character: Character): void {
    console.log("execute TinyMiracle 4");
  }

  removeTwoSetBonuses(character: Character): void {
    console.log("remove TinyMiracle 2");
    character.calculatorStats.hydroResistance.removeAdditionalValue(20);
    character.calculatorStats.pyroResistance.removeAdditionalValue(20);
    character.calculatorStats.dendroResistance.removeAdditionalValue(20);
    character.calculatorStats.cryoResistance.removeAdditionalValue(20);
    character.calculatorStats.electroResistance.removeAdditionalValue(20);
    character.calculatorStats.geoResistance.removeAdditionalValue(20);
    character.calculatorStats.anemoResistance.removeAdditionalValue(20);
  }

  removeFourSetBonuses(character: Character): void {
    console.log("remove TinyMiracle 4");
  }
}