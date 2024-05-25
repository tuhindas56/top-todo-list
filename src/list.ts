export function createList() {
  const tasks: {}[] = []
  return {
    tasks,
    _type: "list",
  }
}
export function storeTaskInList(task: {}, list: { tasks: {}[]; _type: string }) {
  list.tasks.push(task)
}
