export function createList(name: string) {
  const tasks: {}[] = []
  return {
    name,
    tasks,
  }
}
