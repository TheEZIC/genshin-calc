import {container, ContainerBindings} from "@/inversify.config";
import DamageCalculator from "@/Roster/DamageCalculator";

export interface ISubscriber<SubscriberArgs = void> {
  runOnEvent(args: SubscriberArgs): void;
}

export type Subscriber<SubscriberArgs = void> = (args: SubscriberArgs) => void;

export interface ProxyEvent<SubscriberArgs = void> {
  startFrame: number;
  args: SubscriberArgs;
}

type SubscriberArgs<T> = Subscriber<T> | ISubscriber<T>;
type SubscriberProxyArgs<T> = Subscriber<ProxyEvent<T>> | ISubscriber<ProxyEvent<T>>;

export default class Listener<T = void> {
  private subscribers: Array<SubscriberArgs<T>> = [];
  private subscribersWithProxy: Array<SubscriberProxyArgs<T>> = [];

  private addToList<T>(list: T[], subscriber: T) {
    const isExist = list.includes(subscriber);

    if (!isExist) {
      list.push(subscriber);
    }
  }

  private removeFromList<T>(list: T[], subscriber: T) {
    const observerIndex = list.indexOf(subscriber);
    if (observerIndex === -1) return;
    list.splice(observerIndex, 1);
  }

  public subscribe(subscriber: Subscriber<T> | ISubscriber<T>) {
    this.addToList<SubscriberArgs<T>>(this.subscribers, subscriber);
  }

  public unsubscribe(subscriber: Subscriber<T> | ISubscriber<T>) {
    this.removeFromList<SubscriberArgs<T>>(this.subscribers, subscriber);
  }

  public subscribeWithProxy(subscriber: Subscriber<ProxyEvent<T>> | ISubscriber<ProxyEvent<T>>) {
    this.addToList<SubscriberProxyArgs<T>>(this.subscribersWithProxy, subscriber);
  }

  public unsubscribeWithProxy(subscriber: Subscriber<ProxyEvent<T>> | ISubscriber<ProxyEvent<T>>) {
    this.removeFromList<SubscriberProxyArgs<T>>(this.subscribersWithProxy, subscriber);
  }

  public notifyAll(args: T): void {
    const damageCalculator: DamageCalculator = container.get<DamageCalculator>(ContainerBindings.DamageCalculator);

    this.subscribers.forEach((s) =>
      typeof s === "object" ? s.runOnEvent(args) : s(args)
    );

    this.subscribersWithProxy.forEach(s => {
      const arg: ProxyEvent<T> = {
        startFrame: damageCalculator.currentFrame,
        args,
      }

      typeof s === "object" ? s.runOnEvent(arg) : s(arg);
    });
  }
}
