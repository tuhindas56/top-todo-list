import "./style.css"

import { storeList } from "./storage"
import * as domUtils from "./domUtils"

const lists = document.querySelector("#lists") as HTMLUListElement
let listIndex = 0

function addNewListItem(name: string, index: number) {
  const newList = domUtils.createListElement(listIndex)
  const newButton = domUtils.createButtonElement(name)
  domUtils.assignClasses(newList, "mb-2", "hover:bg-slate-100")
  domUtils.assignClasses(newButton, "w-full", "p-2", "text-left")
  domUtils.appendItem(newList, newButton)
  domUtils.appendItem(lists, newList)
  storeList(name, index)
  listIndex++
}

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
  if (["", null].includes(listName.value) || listName.value.length < 4) {
    listError.classList.remove("hidden")
    return
  }
  addNewListItem(listName.value, listIndex)
  const taskFormHeading = document.querySelector("#task_form_heading") as HTMLParagraphElement
  taskFormHeading.textContent = `Add task to ${listName.value}`
  domUtils.closeDialog("list")
  domUtils.openDialog("task")
  const resetButton = document.querySelector('#list_form button[type="reset"]') as HTMLButtonElement
  resetButton.click()
}

const addListBtn = document.querySelector("#btn_add_list") as HTMLButtonElement
addListBtn.addEventListener("click", () => domUtils.openDialog("list"))

createButton.addEventListener("click", listFormHandling)

function closeBtnListeners(id: string) {
  const button = document.querySelector(`dialog#${id}_form button.btn_close`) as HTMLButtonElement
  button.addEventListener("click", () => domUtils.closeDialog(id))
}
closeBtnListeners("list")
closeBtnListeners("task")

// On page load stuff
addNewListItem("House", listIndex)
addNewListItem("Work", listIndex)
addNewListItem("Family", listIndex)
