import Task from "./task"
import { getCurrentList, retrieveAllListsFromLS, retrieveAllTasksFromCurrentList } from "./localStorageUtils"
import { appendItem, assignClasses, createButtonElement, createListElement, createTaskElement } from "./domElementUtils"

const listContainer = document.querySelector("#lists") as HTMLUListElement

export function renderListsToDOM(name: string, id: string) {
  if (!document.querySelector(`#list_${id}`)) {
    const newList = createListElement(id)
    const newButton = createButtonElement(name, id)
    assignClasses(newList, "mb-2", "hover:bg-slate-100", "fadeIn", "transition", "duration-100")
    assignClasses(newButton, "w-full", "p-2", "text-left")
    appendItem(newList, newButton)
    appendItem(listContainer, newList)
  } else {
    return
  }
}

export function reRenderList() {
  const currentList = getCurrentList()!
  const listButtonToChange = document.querySelector(`#list_${currentList[0].id} button`) as HTMLButtonElement
  listButtonToChange.innerText = currentList[0].name
  listButtonToChange.click()
}

export function delListFromDOM() {
  const toRemove = document.querySelector(`#list_${getCurrentList()![0].id}`) as HTMLLIElement
  toRemove.classList.add("fadeOut")
  setTimeout(() => toRemove.remove(), 300)
}

export function renderTasksToDOM(title: string, description: string, dueDate: string, priority: number, id: string) {
  if (!document.querySelector(`#tasks #task${id}`)) {
    const newTask = createTaskElement(title, description, dueDate, priority, id)
    const tasks = document.querySelector("#tasks") as HTMLOListElement
    appendItem(tasks, newTask)
  } else {
    return
  }
}

export function renderExisting(sortType?: string) {
  const lists = retrieveAllListsFromLS()
  const tasks = retrieveAllTasksFromCurrentList(sortType)!
  const taskContainer = document.querySelector("#tasks") as HTMLOListElement
  taskContainer.innerHTML = ""
  for (let list of lists) {
    renderListsToDOM(list[0].name, list[0].id)
  }
  for (let task of tasks) {
    Object.setPrototypeOf(task, Task.prototype)
    renderTasksToDOM(task.title, task.description, task.dueDate, task.priority, task.id)
    reRenderTask(task.id)
  }
}

export function delTaskFromDOM(id: string) {
  const toRemove = document.querySelector(`#task_${id}`) as HTMLLIElement
  toRemove.classList.add("fadeOut")
  setTimeout(() => toRemove.remove(), 300)
}

export function fadeAnimation(element: HTMLElement) {
  element.classList.add("fadeIn")
  element.addEventListener(
    "animationend",
    () => {
      element.classList.remove("fadeIn")
    },
    { once: true },
  )
}

export function reRenderTask(id: string) {
  const checkbox = document.querySelector(`#checkbox_complete_${id}`) as HTMLInputElement
  const span = document.querySelector(`#task_${id} .completion_span`) as HTMLSpanElement
  const tasks = retrieveAllTasksFromCurrentList()!
  for (let task of tasks) {
    if (task.id === id && task.completed) {
      checkbox.checked = true
      span.innerText = "Completed"
      break
    } else {
      checkbox.checked = false
      span.innerText = "Not complete"
    }
  }
}
