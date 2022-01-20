export interface IMultipleHitSkill {
  hits: number;
}

export function IMultipleHitSkill(obj: any) {
  return Boolean(obj["hits"]);
}
