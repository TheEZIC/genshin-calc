import Buff from "@/Buffs/Buff";

export interface IWithBuffs {
  buffs: Buff[];
  addBuff: () => void;
  removeBuff: () => void;
}