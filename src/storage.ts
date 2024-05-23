import Task from "./task"
export function storeItem(list: { tasks: {}[] }, name: string) {
  localStorage.setItem(`${name}`, JSON.stringify(list))
}
export function clearStorage() {
  localStorage.clear()
}
export function retrieveItem(listIndex: number) {
  const itemToParse = localStorage.getItem(`${listIndex}`)
  if (itemToParse) {
    const parsed = JSON.parse(itemToParse)
    parsed.tasks.forEach((task: Task) => {
      Object.setPrototypeOf(task, Task.prototype)
    })

    return parsed
  }
  return
}
export function removeItem(listIndex: number) {
  localStorage.removeItem(`${listIndex}`)
}
