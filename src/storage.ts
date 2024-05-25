import Task from "./task"

export function clearStorage() {
  localStorage.clear()
}

export function storeList(name: string, list: { tasks: {}[] }) {
  localStorage.setItem(name, JSON.stringify(list))
}

export function retrieveList(name: string) {
  const toParse = localStorage.getItem(name)
  if (toParse) {
    const parsedList = JSON.parse(toParse)
    parsedList.tasks.forEach((task: {}[]) => Object.setPrototypeOf(task, Task.prototype))
    return parsedList
  }
  return false
}

document.querySelector(".resetdb")?.addEventListener("click", clearStorage)
