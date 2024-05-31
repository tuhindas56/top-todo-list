import { Priorities } from "./task"
import { getCurrentList, editListNameInLS, retrieveAllTasksFromCurrentList } from "./localStorageUtils"
import { closeDialog, openDialog } from "./dialogUtils"
import { addNewList, addNewTask } from "./main"
import { delTaskFromDOM, reRenderList } from "./domRenderingUtils"

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
const taskPriorities = document.querySelectorAll(`input[name="task_priority"]`) as NodeListOf<HTMLInputElement>
const taskTitleError = document.querySelector(`#task_title_error`) as HTMLParagraphElement
const taskFormError = document.querySelector(`#task_error`) as HTMLParagraphElement
const taskExistsError = document.querySelector("#task_exists_error") as HTMLParagraphElement

export function taskFormHandling(event: MouseEvent) {
  event.preventDefault()
  const resetButton = document.querySelector('#task_form button[type="reset"]') as HTMLButtonElement

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
  resetButton.click()
}

export function editTaskFormHandling(event: MouseEvent) {
  event.preventDefault()
  let taskID = (event.target as HTMLButtonElement).dataset.id

  const editTitle = document.querySelector("#edit_title") as HTMLInputElement
  const editDesc = document.querySelector("#edit_desc") as HTMLTextAreaElement
  const editDue = document.querySelector("#edit_due") as HTMLInputElement
  const editPriorities = document.querySelectorAll('input[name="edit_priority"]') as NodeListOf<HTMLInputElement>
  const editTitleError = document.querySelector(`#edit_title_error`) as HTMLParagraphElement
  const editFormError = document.querySelector(`#edit_error`) as HTMLParagraphElement

  if (["", null].includes(editTitle.value) || ["", null].includes(editDue.value)) {
    editFormError.classList.remove("hidden")
    setTimeout(() => editFormError.classList.add("hidden"), 3500)
    return
  } else if (editTitle.value.length < 4) {
    editTitleError.classList.remove("hidden")
    setTimeout(() => editTitleError.classList.add("hidden"), 3500)
    return
  } else {
    editTitleError.classList.add("hidden")
    editFormError.classList.add("hidden")
  }

  let editPriority
  for (let priority of editPriorities) {
    if (priority.checked) {
      editPriority = +priority.value as Priorities
    }
  }

  const currentList = getCurrentList()!
  for (let [index, task] of currentList.entries()) {
    if (task.id === taskID) {
      currentList.splice(index, 1)
      delTaskFromDOM(taskID)
      addNewTask(editTitle.value, editDesc.value, editDue.value, editPriority!)
      break
    }
  }
  closeDialog("edit")
}
