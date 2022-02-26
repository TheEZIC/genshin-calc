import {IBehavior} from "@/Behavior/IBehavior";

export interface IBehaviorWithEvents<T, A = void> extends IBehavior<T, A> {
  onStart: (args: A) => void;
  onUpdate: (args: A) => void;
  onEnd: (args: A) => void;
}
