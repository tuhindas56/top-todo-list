import { closeDialog, openDialog, openEditListDialog, deleteListBtnHandling } from "./domUtils"
import { editListFormHandling, listFormHandling, listNameInputLengthCheck } from "./formHandling"
import { deleteList } from "./main"

const addListBtn = document.querySelector("#btn_add_list") as HTMLButtonElement
const createListButton = document.querySelector("#btn_create_list") as HTMLButtonElement
const listName = document.querySelector("#form_list_name") as HTMLInputElement
const editListBtn = document.querySelector("#btn_edit_list_name") as HTMLButtonElement
const changeListNameBtn = document.querySelector("#btn_change_list_name") as HTMLButtonElement
const delListBtn = document.querySelector("#btn_del_list") as HTMLButtonElement
const deletionModalAgreeBtn = document.querySelector(
  "#deletion_modal_agree_btn",
) as HTMLButtonElement

export default () => {
  addListBtn.addEventListener("click", () => openDialog("list"))
  createListButton.addEventListener("click", listFormHandling)
  listName.addEventListener("input", listNameInputLengthCheck)
  editListBtn.addEventListener("click", openEditListDialog)
  changeListNameBtn.addEventListener("click", editListFormHandling)
  delListBtn.addEventListener("click", deleteListBtnHandling)

  deletionModalAgreeBtn.addEventListener("click", deleteList)

  function closeBtnListeners(id: string) {
    const button = document.querySelector(`dialog#${id}_form button.btn_close`) as HTMLButtonElement
    button.addEventListener("click", () => closeDialog(id))
  }
  closeBtnListeners("list")
  closeBtnListeners("task")
  closeBtnListeners("edit")
}
