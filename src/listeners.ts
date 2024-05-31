import { closeDialog, openDialog, openEditListDialog } from "./dialogUtils"
import { fadeAnimation, renderExisting } from "./domRenderingUtils"
import { editListFormHandling, listFormHandling, taskFormHandling } from "./formHandling"
import { getCurrentList } from "./localStorageUtils"
import { deleteList } from "./main"

const taskCategories = document.querySelector("#task_categories") as HTMLUListElement
const addListBtn = document.querySelector("#btn_add_list") as HTMLButtonElement
const createListButton = document.querySelector("#btn_create_list") as HTMLButtonElement
const editListBtn = document.querySelector("#btn_edit_list_name") as HTMLButtonElement
const changeListNameBtn = document.querySelector("#btn_change_list_name") as HTMLButtonElement
const delListBtn = document.querySelector("#btn_del_list") as HTMLButtonElement
const deletionModalAgreeBtn = document.querySelector("#deletion_modal_agree_btn") as HTMLButtonElement
const delListHead = document.querySelector("#del_list_name_head") as HTMLSpanElement
const deletionModalCancelBtn = document.querySelector("#deletion_modal_cancel_btn") as HTMLButtonElement
const addTaskBtn = document.querySelector("#btn_add_task") as HTMLButtonElement
const createTaskButton = document.querySelector("#task_btn") as HTMLButtonElement
const taskContainer = document.querySelector("#tasks") as HTMLOListElement
const currentCategory = document.querySelector("#current_category") as HTMLSpanElement

export default () => {
  taskCategories.addEventListener("click", handleTaskCategoryClick)
  addListBtn.addEventListener("click", () => openDialog("list"))
  createListButton.addEventListener("click", listFormHandling)
  editListBtn.addEventListener("click", openEditListDialog)
  changeListNameBtn.addEventListener("click", editListFormHandling)
  delListBtn.addEventListener("click", deleteListBtnHandling)
  deletionModalAgreeBtn.addEventListener("click", deleteList)
  addTaskBtn.addEventListener("click", () => openDialog("task", getCurrentList()![0].name))
  createTaskButton.addEventListener("click", (event) => taskFormHandling(event))
  taskContainer.addEventListener("click", handleTaskContainerClicks)

  function closeBtnListeners(id: string) {
    const button = document.querySelector(`dialog#${id}_form button.btn_close`) as HTMLButtonElement
    button.addEventListener("click", () => {
      closeDialog(id)
      if (id === "edit") return
      const resetButton = document.querySelector(`dialog#${id}_form button[type="reset"]`) as HTMLButtonElement
      resetButton.click()
    })
  }
  closeBtnListeners("list")
  closeBtnListeners("task")
  closeBtnListeners("edit")
}

function handleTaskCategoryClick(event: MouseEvent) {
  let target = event.target as HTMLButtonElement
  switch (target.id) {
    case "btn_all":
      renderExisting()
      fadeAnimation(currentCategory)
      currentCategory.innerText = "All"
      break
    case "btn_today":
      renderExisting("today")
      fadeAnimation(currentCategory)
      currentCategory.innerText = "Today"
      break
    case "btn_upcoming":
      renderExisting("upcoming")
      fadeAnimation(currentCategory)
      currentCategory.innerText = "Upcoming"
      break
    case "btn_completed":
      renderExisting("completed")
      fadeAnimation(currentCategory)
      currentCategory.innerText = "Completed"
      break
    default:
      return
  }
}

export function deleteListBtnHandling() {
  const listNodes = document.querySelectorAll("#lists li") as NodeListOf<HTMLButtonElement>
  if (listNodes.length > 1) {
    delListHead.innerHTML = `
        Are you sure you want to delete <span class="text-red-500">${getCurrentList()![0].name}</span>?`
    deletionModalAgreeBtn.classList.remove("hidden")
    deletionModalCancelBtn.classList.remove("hidden")
    return
  }
  delListHead.innerText =
    "You cannot delete the last remaining list. There must be at least one list present at all times. Please create a new list before deleting the current one."
  deletionModalAgreeBtn.classList.add("hidden")
  deletionModalCancelBtn.classList.add("hidden")
  return
}

function handleTaskContainerClicks(event: MouseEvent) {
  const targetID = (event.target as HTMLButtonElement | HTMLInputElement).id
  let [, name, id] = targetID.split("_")

  switch (name) {
    case "edit":
      openDialog("edit")
      break
    case "del":
      console.log(`${id} deleted`)
      break
    case "complete":
      console.log(`${id} completed`)
  }
}
