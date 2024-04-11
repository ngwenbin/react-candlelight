export class ListNode<T> {
  data: T
  prev: ListNode<T> | null = null
  next: ListNode<T> | null = null

  constructor(data: T) {
    this.data = data
    this.prev = null
    this.next = null
  }
}

export class DoublyLinkedList<T> {
  size: number
  head: ListNode<T> | null = null
  tail: ListNode<T> | null = null

  constructor() {
    this.size = 0
    this.head = null
    this.tail = null
  }

  // Insert node to tail of the list
  push(data: T): ListNode<T> {
    const newNode = new ListNode(data)

    if (this.tail === null) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.tail.next = newNode
      newNode.prev = this.tail
      this.tail = newNode
    }

    this.size += 1

    return newNode
  }

  // Remove node from head of list
  shift(): ListNode<T> | null {
    if (this.size === 0) {
      return null
    }

    const nodeToRemove = this.head

    if (this.size === 1) {
      this.head = null
      this.tail = null
    } else if (nodeToRemove) {
      this.head = nodeToRemove.next
      nodeToRemove.next = null
    }

    this.size -= 1

    return nodeToRemove
  }

  // Insert node at head of the list
  unshift(data: T): ListNode<T> {
    const newNode = new ListNode(data)

    if (this.head === null) {
      this.head = newNode
      this.tail = newNode
    } else {
      newNode.next = this.head
      this.head.prev = newNode
      this.head = newNode
    }

    this.size += 1

    return newNode
  }

  toList(limit?: number): ListNode<T>[] {
    const list: ListNode<T>[] = []
    let currentNode = this.head
    let counter = 0
    const maxLimit = limit ?? this.size

    while (currentNode !== null && counter < maxLimit) {
      list.push(currentNode)
      currentNode = currentNode.next
      counter += 1
    }

    return list
  }
}
