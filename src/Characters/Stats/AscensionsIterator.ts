import Iterator from "../../Helpers/Iterator";
import Ascension from "./Ascension";

type AscensionRange = [min: number, max: number];

export default class AscensionsIterator extends Iterator<Ascension> {
  constructor(ranges: AscensionRange[]) {
    super([]);

    this.data = ranges.map((range, i) => {
      const [min, max] = range;
      return new Ascension(min, max, i, this);
    });
  }
}