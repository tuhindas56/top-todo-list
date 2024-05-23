import "./style.css"
import { createList } from "./list"
import { storeItem } from "./storage"
import { closeDialog, openDialog } from "./domUtils"

let listIndex = 0
const lists = document.querySelector("#lists") as HTMLUListElement

function createListElement() {
  const newListElement = document.createElement("li") as HTMLLIElement
  newListElement.dataset.index = `${listIndex}`
  return newListElement
}

function createButtonElement(name: string) {
  const newButtonElement = document.createElement("button") as HTMLButtonElement
  newButtonElement.textContent = name
  return newButtonElement
}

function assignClasses(element: HTMLElement, ...classes: string[]) {
  classes.forEach((item) => element.classList.add(item))
}

function appendItem(parent: HTMLElement, child: HTMLElement) {
  parent.append(child)
}

function storeList(name: string, index: number) {
  const newList = createList(index)
  storeItem(newList, name)
}

function addNewListItem(name: string, index: number) {
  const newList = createListElement()
  const newButton = createButtonElement(name)
  assignClasses(newList, "mb-2", "hover:bg-slate-100")
  assignClasses(newButton, "w-full", "p-2", "text-left")
  appendItem(newList, newButton)
  appendItem(lists, newList)
  storeList(name, index)

  listIndex++
}

// List form

const listName = document.querySelector("#form_list_name") as HTMLInputElement
const createButton = document.querySelector("#btn_create_list") as HTMLButtonElement
const listError = document.querySelector("#list_error") as HTMLParagraphElement

function listNameInputLengthCheck() {
  if (listName.value.length >= 4) {
    listError.classList.add("hidden")
  } else {
    listError.classList.remove("hidden")
  }
}

listName.addEventListener("input", listNameInputLengthCheck)

function listFormHandling(event: MouseEvent) {
  event.preventDefault()

  if (
    ["", null].includes(listName.value) ||
    listName.value.length < 4 ||
    listName.value.length > 20
  ) {
    listError.classList.remove("hidden")
    return
  }

  addNewListItem(listName.value, listIndex)

  taskFormHeading.textContent = `Add task to ${listName.value}`

  closeDialog("list")
  openDialog("task")

  const resetButton = document.querySelector('#list_form button[type="reset"]') as HTMLButtonElement
  resetButton.click()
}

// Task Form
const taskFormHeading = document.querySelector("#task_form_heading") as HTMLParagraphElement

// Listeners
const addListBtn = document.querySelector("#btn_add_list") as HTMLButtonElement
addListBtn.addEventListener("click", () => openDialog("list"))

createButton.addEventListener("click", listFormHandling)

function closeDialogListeners(id: string) {
  const button = document.querySelector(`dialog#${id}_form button.btn_close`) as HTMLButtonElement
  button.addEventListener("click", () => closeDialog(id))
}
closeDialogListeners("list")
closeDialogListeners("task")
