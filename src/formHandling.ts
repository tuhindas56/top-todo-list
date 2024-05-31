import { addNewList, addNewTask } from "./main"
import { openDialog, closeDialog, reRenderList } from "./domUtils"
import {
  getCurrentList,
  editListNameInLS,
  retrieveAllTasksFromCurrentList,
} from "./localStorageUtils"
import { Priorities } from "./task"

// List Form
const listName = document.querySelector("#form_list_name") as HTMLInputElement
const listError = document.querySelector("#list_error") as HTMLParagraphElement

export function listFormHandling(event: MouseEvent) {
  event.preventDefault()
  if (["", null].includes(listName.value) || listName.value.length < 4) {
    listError.classList.remove("hidden")
    setTimeout(() => listError.classList.add("hidden"), 3500)

    return
  }
  addNewList(listName.value)
  closeDialog("list")
  openDialog("task", getCurrentList()![0].name)
  const resetButton = document.querySelector('#list_form button[type="reset"]') as HTMLButtonElement
  resetButton.click()
}

export function editListFormHandling(event: MouseEvent) {
  event.preventDefault()
  if (["", null].includes(listName.value) || listName.value.length < 4) {
    listError.classList.remove("hidden")
    setTimeout(() => listError.classList.add("hidden"), 3500)
    return
  }
  editListNameInLS(listName.value)
  reRenderList()
  closeDialog("list")
  const resetButton = document.querySelector('#list_form button[type="reset"]') as HTMLButtonElement
  resetButton.click()
}

// Task Form
const taskTitle = document.querySelector(`#task_title`) as HTMLInputElement
const taskDescription = document.querySelector(`#task_desc`) as HTMLTextAreaElement
const taskDue = document.querySelector(`#task_due`) as HTMLInputElement
const taskPriorities = document.querySelectorAll(
  `input[name="task_priority"]`,
) as NodeListOf<HTMLInputElement>
const taskTitleError = document.querySelector(`#task_title_error`) as HTMLParagraphElement
const taskFormError = document.querySelector(`#task_error`) as HTMLParagraphElement
const taskExistsError = document.querySelector("#task_exists_error") as HTMLParagraphElement

export function taskFormHandling(event: MouseEvent) {
  event.preventDefault()

  if (["", null].includes(taskTitle.value) || ["", null].includes(taskDue.value)) {
    taskFormError.classList.remove("hidden")
    setTimeout(() => taskFormError.classList.add("hidden"), 3500)
    return
  } else if (taskTitle.value.length < 4) {
    taskTitleError.classList.remove("hidden")
    setTimeout(() => taskTitleError.classList.add("hidden"), 3500)
    return
  } else {
    taskTitleError.classList.add("hidden")
    taskFormError.classList.add("hidden")
  }

  const allTasks = retrieveAllTasksFromCurrentList()!
  if (allTasks.length > 0) {
    for (let task of allTasks) {
      if (task.title === taskTitle.value) {
        taskExistsError.classList.remove("hidden")
        setTimeout(() => taskExistsError.classList.add("hidden"), 3500)
        return
      }
    }
  }

  let taskPriority: Priorities = 1
  for (let priority of taskPriorities) {
    if (priority.checked) {
      taskPriority = +priority.value as Priorities
    }
  }
  addNewTask(taskTitle.value, taskDescription.value, taskDue.value, taskPriority)
  closeDialog("task")
  const resetButton = document.querySelector('#task_form button[type="reset"]') as HTMLButtonElement
  resetButton.click()
}
