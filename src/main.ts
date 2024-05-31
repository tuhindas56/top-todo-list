import "./init"
import "./mutationHandler"
import Task, { Priorities } from "./task"
import {
  deleteListFromLS,
  getCurrentList,
  retrieveAllTasksFromCurrentList,
  retrieveListFromLS,
  setCurrentList,
  storeListInLS,
} from "./localStorageUtils"
import { createList, storeTaskInList } from "./list"
import { delListFromDOM, renderListsToDOM, renderTasksToDOM } from "./domRenderingUtils"
import "./style.css"
import "flowbite"

export function addNewList(name: string) {
  if (!retrieveListFromLS(name)) {
    const newList = createList(name)
    storeListInLS(newList)
    renderListsToDOM(name, newList[0].id)
    setCurrentList(newList[0].id)
  }
}

export function deleteList() {
  delListFromDOM()
  deleteListFromLS()
}

export function addNewTask(title: string, description: string, dueDate: string, priority: Priorities) {
  let tasks = retrieveAllTasksFromCurrentList()!
  if (tasks.length !== 0) {
    if (tasks.some((task: Task) => task.title === title)) return
  }
  const newTask = new Task({
    title: title,
    description: description,
    dueDate: dueDate,
    priority: priority,
  })
  const currentList = getCurrentList()!
  storeTaskInList(currentList, newTask)
  storeListInLS(currentList)
  tasks = retrieveAllTasksFromCurrentList()!
  let date = newTask.dueDate
  let id = newTask.id
  renderTasksToDOM(title, description, date, priority, id)
}
