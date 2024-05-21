import Task from "./task"
export function storeList(list: { name: string; tasks: {}[] }) {
  localStorage.setItem(`${list.name}`, JSON.stringify(list))
}
export function clearStorage() {
  localStorage.clear()
}
export function retrieveList(listName: string) {
  const itemToParse = localStorage.getItem(listName)
  if (itemToParse) {
    const parsed = JSON.parse(itemToParse)
    parsed.tasks.forEach((task: Task) => {
      Object.setPrototypeOf(task, Task.prototype)
    })

    return parsed
  }
  return
}
export function removeList(name: string) {
  localStorage.removeItem(name)
}
