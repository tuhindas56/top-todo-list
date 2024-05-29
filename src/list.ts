export function createList(id: string) {
  const tasks: {}[] = []
  return {
    tasks,
    id,
  }
}
export function storeTaskInList(task: {}, list: { tasks: {}[]; id: string }) {
  list.tasks.push(task)
}
