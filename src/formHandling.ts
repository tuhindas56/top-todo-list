import { addNewList } from "./main"
import { openDialog, closeDialog, reRenderList } from "./domUtils"
import { getCurrentList, editListNameInLS } from "./localStorageUtils"

const listName = document.querySelector("#form_list_name") as HTMLInputElement
const listError = document.querySelector("#list_error") as HTMLParagraphElement

export function listFormHandling(event: MouseEvent) {
  event.preventDefault()
  if (["", null].includes(listName.value) || listName.value.length < 4) {
    listError.classList.remove("hidden")
    return
  }
  addNewList(listName.value)
  closeDialog("list")
  openDialog("task", getCurrentList()![0].name)
  const resetButton = document.querySelector('#list_form button[type="reset"]') as HTMLButtonElement
  resetButton.click()
}

export function listNameInputLengthCheck() {
  if (listName.value.length >= 4) {
    listError.classList.add("hidden")
  } else {
    listError.classList.remove("hidden")
  }
}

export function editListFormHandling(event: MouseEvent) {
  event.preventDefault()
  if (["", null].includes(listName.value) || listName.value.length < 4) {
    listError.classList.remove("hidden")
    return
  }
  editListNameInLS(listName.value)
  reRenderList()
  closeDialog("list")
  const resetButton = document.querySelector('#list_form button[type="reset"]') as HTMLButtonElement
  resetButton.click()
}
