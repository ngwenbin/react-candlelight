import { DoublyLinkedList, ListNode } from "./doublyLL"

export const QUEUE_CAPACITY = 1000000

export class Queue<T> {
  private items: DoublyLinkedList<T>
  private capacity: number = QUEUE_CAPACITY

  constructor() {
    this.items = new DoublyLinkedList<T>()
  }

  enqueue(item: T): void {
    if (this.size() < this.capacity) {
      this.items.push(item)
    } else {
      throw new Error("Max capacity reached.")
    }
  }

  insertStart(item: T): void {
    if (this.size() < this.capacity) {
      this.items.unshift(item)
    } else {
      throw new Error("Max capacity reached.")
    }
  }

  dequeue(): ListNode<T> | null {
    return this.items.shift()
  }

  peek(count: number): ListNode<T>[] {
    return this.items.toList(count)
  }

  size(): number {
    return this.items.size
  }
}
