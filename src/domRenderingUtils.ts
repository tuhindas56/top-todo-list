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

export function renderTasksToDOM(
  title: string,
  description: string,
  dueDate: string,
  priority: number,
  id: string,
  completed?: boolean,
) {
  if (!document.querySelector(`#tasks #task${id}`)) {
    const newTask = createTaskElement(title, description, dueDate, priority, id, completed)
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
    renderTasksToDOM(task.title, task.description, task.dueDate, task.priority, task.id, task.completed)
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
  const taskInDOM = document.querySelector(`#task_${id}`) as HTMLLIElement
  const checkbox = document.querySelector(`#checkbox_complete_${id}`) as HTMLInputElement
  const span = document.querySelector(`#task_${id} .completion_span`) as HTMLSpanElement
  const editBtn = document.querySelector(`#btn_edit_${id}`) as HTMLButtonElement
  const tasks = retrieveAllTasksFromCurrentList()!
  for (let task of tasks) {
    if (task.id === id && task.completed) {
      checkbox.checked = true
      span.innerText = "Completed"
      taskInDOM.style.opacity = "0.5"
      editBtn.disabled = true
      editBtn.classList.remove("hover:bg-gray-100", "hover:text-blue-700", "active:bg-gray-200")
      break
    } else {
      checkbox.checked = false
      span.innerText = "Not completed"
      taskInDOM.style.opacity = "1"
      editBtn.disabled = false
      editBtn.classList.add("hover:bg-gray-100", "hover:text-blue-700", "active:bg-gray-200")
    }
  }
}
