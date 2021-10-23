import Composite from "../../Helpers/Composite";
import Ascension from "./Ascension";

type AscensionRange = [min: number, max: number];

export default class AscensionsComposite extends Composite<Ascension> {
  constructor(ranges: AscensionRange[]) {
    super([]);

    this.data = ranges.map((range, i) => {
      const [min, max] = range;
      return new Ascension(min, max, i, this);
    });
  }
}