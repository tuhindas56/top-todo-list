import { closeDialog, openDialog, openEditListDialog, deleteListBtnHandling } from "./domUtils"
import { editListFormHandling, listFormHandling, taskFormHandling } from "./formHandling"
import { getCurrentList } from "./localStorageUtils"
import { deleteList } from "./main"

const addListBtn = document.querySelector("#btn_add_list") as HTMLButtonElement
const createListButton = document.querySelector("#btn_create_list") as HTMLButtonElement
const editListBtn = document.querySelector("#btn_edit_list_name") as HTMLButtonElement
const changeListNameBtn = document.querySelector("#btn_change_list_name") as HTMLButtonElement
const delListBtn = document.querySelector("#btn_del_list") as HTMLButtonElement
const deletionModalAgreeBtn = document.querySelector(
  "#deletion_modal_agree_btn",
) as HTMLButtonElement
const addTaskBtn = document.querySelector("#btn_add_task") as HTMLButtonElement
const createTaskButton = document.querySelector("#task_btn") as HTMLButtonElement

export default () => {
  addListBtn.addEventListener("click", () => openDialog("list"))
  createListButton.addEventListener("click", listFormHandling)
  editListBtn.addEventListener("click", openEditListDialog)
  changeListNameBtn.addEventListener("click", editListFormHandling)
  delListBtn.addEventListener("click", deleteListBtnHandling)
  deletionModalAgreeBtn.addEventListener("click", deleteList)
  addTaskBtn.addEventListener("click", () => openDialog("task", getCurrentList()![0].name))
  createTaskButton.addEventListener("click", (event) => taskFormHandling(event))

  function closeBtnListeners(id: string) {
    const button = document.querySelector(`dialog#${id}_form button.btn_close`) as HTMLButtonElement
    button.addEventListener("click", () => closeDialog(id))
  }
  closeBtnListeners("list")
  closeBtnListeners("task")
  closeBtnListeners("edit")
}
