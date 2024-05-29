import Task from "./task"
export type List = ({ id: string; name: string } | Task)[]
export function createList(id: string, name: string) {
  return [
    {
      id,
      name,
    },
  ]
}
export function storeTaskInList(list: List, task: Task) {
  list.push(task)
}
