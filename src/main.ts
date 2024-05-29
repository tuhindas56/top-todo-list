import "./style.css"
import Task from "./task"
import { storeList, retrieveList } from "./storage"
import * as domUtils from "./domUtils"
import { createList, storeTaskInList } from "./list"
import { addDays, format, isBefore } from "date-fns"
import generate from "./random"
import "flowbite"

const lists = document.querySelector("#lists") as HTMLUListElement
const listTitle = document.querySelector("#list_title") as HTMLSpanElement

const listContainer = document.querySelector("#lists") as HTMLOListElement
const listMutation = new MutationObserver(() => {
  const buttons = document.querySelectorAll("#lists button") as NodeListOf<HTMLButtonElement>
  if (!buttons) {
    return
  }
  for (let button of buttons) {
    if (button) {
      button.addEventListener("click", switchListDisplayed)
    }
  }
})
listMutation.observe(listContainer, { childList: true })

function switchListDisplayed(event: MouseEvent) {
  let targetName = (event.target as HTMLButtonElement).innerText
  if (currentList === targetName) return
  listTitle.innerText = targetName
  lists.innerHTML = ""
  const tasks = document.querySelector("#tasks") as HTMLOListElement
  tasks.innerHTML = ""
  currentList = targetName
  renderExisting()
}

function handleTaskButtons(event: MouseEvent) {
  let target = event.target as HTMLElement
  const taskList = retrieveList(currentList).tasks

  if (target.innerText === "Edit") {
    for (let task of taskList) {
      if (task.id === target.dataset.id) {
        editTask(task.id, task.title, task.description, task.dueDate, task.priority)
      }
    }
  } else if (target.innerText === "Delete") {
    for (const [index, task] of taskList.entries()) {
      if (task.id === target.dataset.id) {
        deleteTask(task.id, index)
      }
    }
  } else {
    if (target.getAttribute("type") === "checkbox") {
      for (let task of taskList) {
        if (task.id === target.dataset.id) {
          toggleTaskCompletion(task.id)
        }
      }
    }
  }
}

function editTask(
  id: string,
  title: string,
  description: string = "",
  dueDate: string,
  priority: number,
) {
  domUtils.openDialog("edit")
  const editTitle = document.querySelector("#edit_title") as HTMLInputElement
  const editDesc = document.querySelector("#edit_desc") as HTMLTextAreaElement
  const editDueDate = document.querySelector("#edit_due") as HTMLInputElement
  const editPriorities = document.querySelectorAll(
    'input[name="edit_priority"]',
  ) as NodeListOf<HTMLInputElement>

  editTitle.value = title
  editDesc.value = description
  editDueDate.value = format(dueDate, "yyyy-MM-dd")
  editPriorities.forEach((p) => {
    if (+p.value === priority) {
      p.setAttribute("checked", "")
    } else {
      p.removeAttribute("checked")
    }
  })
  const confirmBtn = document.querySelector("#edit_btn") as HTMLButtonElement
  confirmBtn.addEventListener("click", (event) => handleConfirmBtn(event, id), { once: true })
}

function handleConfirmBtn(event: MouseEvent, id: string) {
  taskFormHandling(event, "edit", id)
  const taskInDOM = document.querySelector(`#tasks li#task_${id}`) as HTMLLIElement
  taskInDOM.remove()
}

const taskContainer = document.querySelector("#tasks") as HTMLOListElement
const taskMutation = new MutationObserver(() => {
  const taskEdit = document.querySelectorAll(".btn_edit_task") as NodeListOf<HTMLButtonElement>
  taskEdit.forEach((button) => button.addEventListener("click", handleTaskButtons))

  const taskDelete = document.querySelectorAll(".btn_delete_task") as NodeListOf<HTMLButtonElement>
  taskDelete.forEach((button) => button.addEventListener("click", handleTaskButtons))

  const taskComplete = document.querySelectorAll(
    ".task_completion_checkbox",
  ) as NodeListOf<HTMLInputElement>
  taskComplete.forEach((checkbox) => checkbox.addEventListener("click", handleTaskButtons))
})

taskMutation.observe(taskContainer, { childList: true })

let currentList = "Demo"
listTitle.innerText = currentList

function addNewListItem(name: string) {
  const id = generate()
  if (!retrieveList(name)) {
    const list = createList(id)
    storeList(name, list)
    renderListsToDOM(name, id)
    currentList = name
    listTitle.innerText = name
    lists.innerHTML = ""
    taskContainer.innerHTML = ""
    renderExisting()
  }
}

function renderListsToDOM(name: string, id: string) {
  if (!document.querySelector(`#lists_${id}`)) {
    const newList = domUtils.createListElement(id)
    const newButton = domUtils.createButtonElement(name)
    domUtils.assignClasses(newList, "mb-2", "hover:bg-slate-100")
    domUtils.assignClasses(newButton, "w-full", "p-2", "text-left")
    domUtils.appendItem(newList, newButton)
    domUtils.appendItem(lists, newList)
  } else {
    return
  }
}

const listName = document.querySelector("#form_list_name") as HTMLInputElement
const listError = document.querySelector("#list_error") as HTMLParagraphElement

function listNameInputLengthCheck() {
  if (listName.value.length >= 4) {
    listError.classList.add("hidden")
  } else {
    listError.classList.remove("hidden")
  }
}

function listFormHandling(event: MouseEvent) {
  event.preventDefault()
  if (["", null].includes(listName.value) || listName.value.length < 4) {
    listError.classList.remove("hidden")
    return
  }
  addNewListItem(listName.value)
  currentList = listName.value

  domUtils.closeDialog("list")
  domUtils.openDialog("task", currentList)
  const resetButton = document.querySelector('#list_form button[type="reset"]') as HTMLButtonElement
  resetButton.click()
}

function addNewTaskItem(
  title: string,
  description: string,
  dueDate: string,
  priority: 0 | 1 | 2,
  currentList: string,
  editing: boolean = false,
  editID?: string,
) {
  if (!editing) {
    const id = generate()
    const toTest = JSON.parse(localStorage.getItem(currentList)!)

    const filtered: boolean = toTest.tasks.some((task: Task) => task.title === title)
    if (!filtered) {
      const newTask = new Task({ title, description, dueDate, priority, id })
      const parseList = JSON.parse(localStorage.getItem(currentList)!)
      storeTaskInList(newTask, parseList)
      localStorage.setItem(currentList, JSON.stringify(parseList))
      renderTasksToDOM(title, description, dueDate, priority, id)
    }
  } else {
    if (editID) {
      const parseList = JSON.parse(localStorage.getItem(currentList)!)
      parseList.tasks.forEach((task: Task) => Object.setPrototypeOf(task, Task.prototype))
      const newTasksArray = parseList.tasks.filter((task: Task) => task.id !== editID)
      delete parseList.tasks
      parseList.tasks = newTasksArray

      const newTask = new Task({ title, description, dueDate, priority, id: editID })
      storeTaskInList(newTask, parseList)
      localStorage.setItem(currentList, JSON.stringify(parseList))
      renderTasksToDOM(title, description, dueDate, priority, editID)
    }
  }
}

function renderTasksToDOM(
  title: string,
  description: string,
  dueDate: string,
  priority: number,
  id: string,
) {
  if (!document.querySelector(`#tasks #task${id}`)) {
    const newTask = domUtils.createTaskElement(title, description, dueDate, priority, id)
    newTask.className = "mb-10 ms-4"
    const tasks = document.querySelector("#tasks") as HTMLOListElement
    domUtils.appendItem(tasks, newTask)
  } else {
    return
  }
}

function taskFormHandling(event: MouseEvent, target: string, editID?: string) {
  event.preventDefault()
  const taskTitle = document.querySelector(`#${target}_title`) as HTMLInputElement
  const taskDescription = document.querySelector(`#${target}_desc`) as HTMLTextAreaElement
  const taskDue = document.querySelector(`#${target}_due`) as HTMLInputElement
  const taskPriorities = document.querySelectorAll(
    `input[name="${target}_priority"]`,
  ) as NodeListOf<HTMLInputElement>
  const taskTitleError = document.querySelector(`#${target}_title_error`) as HTMLParagraphElement
  const dateError = document.querySelector(`#${target}_date_error`) as HTMLInputElement
  const taskFormError = document.querySelector(`#${target}_error`) as HTMLParagraphElement

  if (["", null].includes(taskTitle.value) || ["", null].includes(taskDue.value)) {
    taskFormError.classList.remove("hidden")
    return
  } else if (taskTitle.value.length < 4) {
    taskTitleError.classList.remove("hidden")
    taskFormError.classList.add("hidden")
    return
  } else {
    taskTitleError.classList.add("hidden")
    taskFormError.classList.add("hidden")
  }

  let date
  //CHECK THIUS LATER!!!!!!!!!!!!!
  taskDue.setAttribute("min", format(new Date(), "yyyy-MM-dd"))

  if (!isBefore(taskDue.value, format(new Date(), "yyyy-MM-dd"))) {
    date = format(taskDue.value, "dd MMMM yyyy")
    dateError.innerText = ""
  } else {
    dateError.innerText = `Date cannot be less than ${format(new Date(), "dd MMMM yyyy")}!`
    return
  }

  let taskPriority
  taskPriorities.forEach((priority) => {
    if (priority.checked) {
      taskPriority = +priority.value
    }
  })

  if (target === "edit") {
    addNewTaskItem(
      taskTitle.value,
      taskDescription.value,
      date,
      taskPriority!,
      currentList,
      true,
      editID,
    )
    domUtils.closeDialog(target)

    return
  } else {
    addNewTaskItem(taskTitle.value, taskDescription.value, date, taskPriority!, currentList)
    domUtils.closeDialog(target)

    return
  }
}

const addListBtn = document.querySelector("#btn_add_list") as HTMLButtonElement
const createListButton = document.querySelector("#btn_create_list") as HTMLButtonElement
const addTaskBtn = document.querySelector("#btn_add_task") as HTMLButtonElement
const createTaskButton = document.querySelector("#task_btn") as HTMLButtonElement
const delListBtn = document.querySelector("#btn_del_list") as HTMLButtonElement
const deletionModalAgreeBtn = document.querySelector(
  "#deletion_modal_agree_btn",
) as HTMLButtonElement
const deletionModalCancelBtn = document.querySelector(
  "#deletion_modal_cancel_btn",
) as HTMLButtonElement
const delListHead = document.querySelector("#del_list_name_head") as HTMLSpanElement

function deleteListBtnHandling() {
  delListHead.innerText =
    "You cannot delete the last remaining list. There must be at least one list present at all times. Please create a new list before deleting the current one."
  deletionModalAgreeBtn.classList.add("hidden")
  deletionModalCancelBtn.classList.add("hidden")
  const listNodes = document.querySelectorAll("#lists li") as NodeListOf<HTMLButtonElement>
  if (listNodes.length > 1) {
    delListHead.innerHTML = `
      Are you sure you want to delete <span class="text-red-500">${currentList}</span>?`
    deletionModalAgreeBtn.classList.remove("hidden")
    deletionModalCancelBtn.classList.remove("hidden")
  }
  return
}

function setupListeners() {
  addListBtn.addEventListener("click", () => domUtils.openDialog("list"))
  createListButton.addEventListener("click", listFormHandling)
  listName.addEventListener("input", listNameInputLengthCheck)

  addTaskBtn.addEventListener("click", () => domUtils.openDialog("task"))
  createTaskButton.addEventListener("click", (event) => taskFormHandling(event, "task"))

  function closeBtnListeners(id: string) {
    const button = document.querySelector(`dialog#${id}_form button.btn_close`) as HTMLButtonElement
    button.addEventListener("click", () => domUtils.closeDialog(id))
  }

  delListBtn.addEventListener("click", deleteListBtnHandling)

  deletionModalAgreeBtn.addEventListener("click", () => {
    deleteList()
  })

  const editListBtn = document.querySelector("#btn_edit_list_name") as HTMLButtonElement
  editListBtn.addEventListener("click", openEditListDialog)

  const changeListNameBtn = document.querySelector("#btn_change_list_name") as HTMLButtonElement
  changeListNameBtn.addEventListener("click", editListName)

  closeBtnListeners("list")
  closeBtnListeners("task")
  closeBtnListeners("edit")
}

function openEditListDialog() {
  domUtils.openDialog("list", currentList)
}

function editListName(event: MouseEvent) {
  event.preventDefault()
  if (["", null].includes(listName.value) || listName.value.length < 4) {
    listError.classList.remove("hidden")
    return
  }
  editListItem(listName.value)

  domUtils.closeDialog("list")
  const resetButton = document.querySelector('#list_form button[type="reset"]') as HTMLButtonElement
  resetButton.click()
}

function editListItem(newName: string) {
  const listToChange = retrieveList(currentList)
  localStorage.removeItem(currentList)
  localStorage.setItem(newName, JSON.stringify(listToChange))
  currentList = listName.value
  listTitle.innerText = listName.value

  const listButton = document.querySelector(
    `#lists #list_${listToChange.id} button`,
  ) as HTMLButtonElement
  listButton.innerText = listName.value
}

function deleteList() {
  const id = JSON.parse(localStorage.getItem(currentList)!).id
  document.querySelector(`#list_${id}`)!.remove()
  localStorage.removeItem(currentList)
}

function deleteTask(id: string, index: number) {
  document.querySelector(`#task_${id}`)!.remove()
  const list = retrieveList(currentList)
  list.tasks.splice(index, 1)
  localStorage.setItem(currentList, JSON.stringify(list))
}

function toggleTaskCompletion(id: string) {
  const list = retrieveList(currentList)
  for (let task of list.tasks) {
    if (task.id === id) {
      task.toggleCompletion()
      const span = document.querySelector(`#task_${id} span.completion_span`) as HTMLSpanElement
      const button = document.querySelector(`#task_${id} button.btn_edit_task`) as HTMLButtonElement

      if (task.completed === true) {
        button.disabled = true
        button.classList.replace("bg-white", "bg-slate-100")
        button.classList.remove("hover:text-blue-700", "active:bg-gray-200")
        span.innerText = "Complete"
      } else {
        button.disabled = false
        button.classList.replace("bg-slate-100", "bg-white")
        button.classList.add("hover:text-blue-700", "active:bg-gray-200")
        span.innerText = "Not complete"
      }
      break
    }
  }
  localStorage.setItem(currentList, JSON.stringify(list))
}

// On page load stuff
function renderExisting() {
  for (let list in localStorage) {
    const parsedList = JSON.parse(localStorage.getItem(list)!)
    if (parsedList && parsedList.id) {
      renderListsToDOM(list, parsedList.id)
      if (list === currentList && parsedList.tasks) {
        parsedList.tasks.forEach((task: Task) => {
          Object.setPrototypeOf(task, Task.prototype)
        })
        parsedList.tasks.sort((a: Task, b: Task) => +a.dueDate - +b.dueDate)
        parsedList.tasks.forEach((task: Task) => {
          renderTasksToDOM(task.title, task.description, task.dueDate, task.priority, task.id)
        })
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderExisting()

  if (!JSON.parse(localStorage.getItem("visited")!)) {
    addNewListItem("Demo")

    addNewTaskItem(
      "A task that needs to get done",
      "Gotta do this and that and that..",
      format(new Date(), "dd MMMM yyyy"),
      1,
      currentList,
    )
    addNewTaskItem(
      "Another task that needs to get done ASAP",
      "I HAVE TO GET THIS DONE OR I'M COOKED AAAAAAA!",
      format(addDays(new Date(), 2), "dd MMMM yyyy"),
      0,
      currentList,
    )
  }
  setupListeners()
  console.log(
    "%c If found, please report bugs here: https://github.com/tuhindas56/top-todo-list/issues",
    `padding: 15px 0;
    font-family: system-ui;
    font-weight: 600;
    `,
  )
  localStorage.setItem("visited", JSON.stringify(true))
})
