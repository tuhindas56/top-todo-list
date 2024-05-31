import { getCurrentList } from "./localStorageUtils"

const taskFormHeading = document.querySelector("#task_form_heading") as HTMLParagraphElement
const listFormHeading = document.querySelector("#list_form_heading") as HTMLParagraphElement
const createListButton = document.querySelector("#btn_create_list") as HTMLButtonElement
const changeListNameBtn = document.querySelector("#btn_change_list_name") as HTMLButtonElement

export function openDialog(id: string, currentList?: string) {
  const dialog = document.querySelector(`dialog#${id}_form`) as HTMLDialogElement
  if (id === "task" && currentList) {
    taskFormHeading.textContent = `Add task to ${currentList}`
  }
  if (id === "list" && currentList) {
    listFormHeading.textContent = `Edit '${currentList}' list name`
    createListButton.classList.add("hidden")
    createListButton.setAttribute("disabled", "")
    changeListNameBtn.classList.remove("hidden")
    changeListNameBtn.removeAttribute("disabled")
  }
  dialog.showModal()
}

export function closeDialog(id: string) {
  const dialog = document.querySelector(`dialog#${id}_form`) as HTMLDialogElement
  dialog.close()
  listFormHeading.textContent = `Create a task list`
  createListButton.classList.remove("hidden", "disabled")
  createListButton.removeAttribute("disabled")
  changeListNameBtn.classList.add("hidden", "disabled")
  changeListNameBtn.setAttribute("disabled", "")
}

export function openEditListDialog() {
  openDialog("list", getCurrentList()![0].name)
}
