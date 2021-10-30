export class DualLinkedListNode<T> {
  constructor(
    public current: T,
    public prev: DualLinkedListNode<T> | null = null,
    public next :DualLinkedListNode<T> | null = null,
  ) {
  }
}

export default class DualLinkedList<T> {
  public head: DualLinkedListNode<T> | null = null;
  public tail: DualLinkedListNode<T> | null = null;

  constructor(array?: T[]) {
    if (array) this.fromArray(array);
  }

  public prepend(value: T): this {
    const newNode = new DualLinkedListNode(value, this.head);

    if (this.head) this.head.prev = newNode;

    this.head = newNode;

    if (!this.tail) this.tail = newNode;

    return this;
  }

  public append(value: T): this {
    const newNode = new DualLinkedListNode(value);

    if (this.tail) this.tail.next = newNode;

    newNode.prev = this.tail;
    this.tail = newNode;

    if (!this.head) this.head = newNode;

    return this;
  }

  public delete(value: T): this {
    if (!this.head) return this;

    let deletedNode = null;
    let currentNode = <DualLinkedListNode<T> | null>this.head;

    while (currentNode) {
      if (currentNode?.current === value) {
        deletedNode = currentNode;

        if (deletedNode === this.head) {
          this.head = deletedNode.next;

          if (this.head) this.head.prev = null;
          if (deletedNode === this.tail) this.tail === null;
        }
      } else if(deletedNode === this.tail) {
        this.tail = <DualLinkedListNode<T>>deletedNode?.prev;
        this.tail.next = null;
      } else {
        const prevNode = <DualLinkedListNode<T>>deletedNode?.prev;
        const nextNode = <DualLinkedListNode<T>>deletedNode?.next;

        prevNode.next = nextNode;
        nextNode.prev = prevNode;
      }

      currentNode = currentNode.next;
    }

    return this;
  }

  public find(value?: T): DualLinkedListNode<T> | null {
    if (!this.head) return null;

    let currentNode = <DualLinkedListNode<T> | null>this.head;

    while (currentNode) {
      if (value && currentNode.current === value)
        return currentNode;

      currentNode = currentNode.next;
    }

    return null;
  }

  public at(index: number): DualLinkedListNode<T> | null {
    if (!this.head) return null;

    let currentNode = <DualLinkedListNode<T> | null>this.head;
    let currentIndex = 0;

    while (currentNode) {
      if (index === currentIndex)
        return currentNode;

      currentIndex++;
      currentNode = currentNode.next;
    }

    return null;
  }

  public deleteTail(): DualLinkedListNode<T> | null {
    if (!this.tail) return null;

    const deletedTail = this.tail;

    if (this.tail.prev) {
      this.tail = this.tail.prev;
      this.tail.next = null;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedTail;
  }

  deleteHead(): DualLinkedListNode<T> | null {
    if (!this.head) return null;

    const deletedHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
      this.head.prev = null;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  public fromArray(values: T[]): this {
    values.forEach(v => this.append(v));
    return this;
  }

  public toArray(): DualLinkedListNode<T>[] {
    const nodes = [];
    let currentNode = this.head;

    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  reverse(): DualLinkedList<T> {
    let currNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (currNode) {
      nextNode = currNode.next;
      prevNode = currNode.prev;

      currNode.next = prevNode;
      currNode.prev = nextNode;

      prevNode = currNode;
      currNode = nextNode;
    }

    this.tail = this.head;
    this.head = prevNode;

    return this;
  }
}