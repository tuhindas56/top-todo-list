import Task from "./task"
export function createList(id: string, name: string) {
  return [
    {
      id,
      name,
    },
  ]
}
export function storeTaskInList(list: ({ id: string; name: string } | Task)[], task: Task) {
  list.push(task)
}
