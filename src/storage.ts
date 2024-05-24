import Task from "./task"
import { createList } from "./list"

export function storeList(name: string, index: number) {
  const newList = createList(name)
  localStorage.setItem(`${index}`, JSON.stringify(newList))
}

export function clearStorage() {
  localStorage.clear()
}

export function retrieveItem(index: number) {
  const itemToParse = localStorage.getItem(`${index}`)
  if (itemToParse) {
    const parsed = JSON.parse(itemToParse)
    parsed.tasks.forEach((task: Task) => {
      Object.setPrototypeOf(task, Task.prototype)
    })
    return parsed
  }
  return
}
