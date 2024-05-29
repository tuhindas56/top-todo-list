import Task from "./task"
import generate from "./random"

type ListInfo = { id: string; name: string }
export type List = [ListInfo, ...Task[]]

export function createList(name: string): List {
  return [
    {
      id: generate(),
      name,
    },
  ]
}

export function storeTaskInList(list: List, task: Task) {
  list.push(task)
}
