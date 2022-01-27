export interface IEndStrategy {
  onStart(): void;
  onEnd(): void;
  onUpdate(): void;
  shouldEnd(): boolean;
}
