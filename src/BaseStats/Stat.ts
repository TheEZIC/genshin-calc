import {StatType} from "./StatType";

export default class Stat {
  constructor(
    public type: StatType,
    public value: number,
  ) {
  }
}