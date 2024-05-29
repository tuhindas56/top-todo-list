import * as domUtils from "./screenController"
const addListBtn = document.querySelector("#btn_add_list") as HTMLButtonElement

export default () => {
  addListBtn.addEventListener("click", () => domUtils.openDialog("list"))
  // createListButton.addEventListener("click", listFormHandling)
  // listName.addEventListener("input", listNameInputLengthCheck)

  // addTaskBtn.addEventListener("click", () => domUtils.openDialog("task"))
  // createTaskButton.addEventListener("click", (event) => taskFormHandling(event, "task"))

  // delListBtn.addEventListener("click", deleteListBtnHandling)

  // deletionModalAgreeBtn.addEventListener("click", () => {
  //   deleteList()
  // })

  // const editListBtn = document.querySelector("#btn_edit_list_name") as HTMLButtonElement
  // editListBtn.addEventListener("click", openEditListDialog)

  // const changeListNameBtn = document.querySelector("#btn_change_list_name") as HTMLButtonElement
  // changeListNameBtn.addEventListener("click", editListName)
  function closeBtnListeners(id: string) {
    const button = document.querySelector(`dialog#${id}_form button.btn_close`) as HTMLButtonElement
    button.addEventListener("click", () => domUtils.closeDialog(id))
  }
  closeBtnListeners("list")
  closeBtnListeners("task")
  closeBtnListeners("edit")
}
