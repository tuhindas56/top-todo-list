import { closeDialog, openDialog, openEditListDialog } from "./dialogUtils"
import { delTaskFromDOM, fadeAnimation, renderExisting } from "./domRenderingUtils"
import { editListFormHandling, editTaskFormHandling, listFormHandling, taskFormHandling } from "./formHandling"
import { deleteTaskFromLS, getCurrentList, retrieveAllTasksFromCurrentList } from "./localStorageUtils"
import { deleteList } from "./main"
import { format } from "date-fns"

const sidebar = document.querySelector("#sidebar") as HTMLElement
const taskCategories = document.querySelector("#task_categories") as HTMLUListElement
const addListBtn = document.querySelector("#btn_add_list") as HTMLButtonElement
const createListButton = document.querySelector("#btn_create_list") as HTMLButtonElement
const toggleSidebarButton = document.querySelector("#toggle_sidebar") as HTMLButtonElement
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
const taskEditBtn = document.querySelector("#edit_btn") as HTMLButtonElement
const editTitle = document.querySelector("#edit_title") as HTMLInputElement
const editDesc = document.querySelector("#edit_desc") as HTMLTextAreaElement
const editDueDate = document.querySelector("#edit_due") as HTMLInputElement
const editPriorities = document.querySelectorAll('input[name="edit_priority"]') as NodeListOf<HTMLInputElement>

export default () => {
  taskCategories.addEventListener("click", handleTaskCategoryClick)
  addListBtn.addEventListener("click", () => openDialog("list"))
  createListButton.addEventListener("click", listFormHandling)
  toggleSidebarButton.addEventListener("click", toggleSidebar)
  editListBtn.addEventListener("click", openEditListDialog)
  changeListNameBtn.addEventListener("click", editListFormHandling)
  delListBtn.addEventListener("click", deleteListBtnHandling)
  deletionModalAgreeBtn.addEventListener("click", deleteList)
  addTaskBtn.addEventListener("click", () => openDialog("task", getCurrentList()![0].name))
  createTaskButton.addEventListener("click", (event) => taskFormHandling(event))
  taskContainer.addEventListener("click", handleTaskContainerClicks)
  taskEditBtn.addEventListener("click", editTaskFormHandling)

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

function toggleSidebar() {
  sidebar.classList.toggle("hidden")
  fadeAnimation(sidebar)
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
      prepareEditForm(id)
      break
    case "del":
      deleteTaskFromLS(id)
      delTaskFromDOM(id)
      break
    case "complete":
      console.log(`${id} completed`)
  }
}

function prepareEditForm(id: string) {
  const tasks = retrieveAllTasksFromCurrentList()!
  let taskTitle, taskDesc, taskDue, taskPriority
  for (let task of tasks) {
    if (task.id === id) {
      taskTitle = task.title
      taskDesc = task.description
      taskDue = task.dueDate
      taskPriority = task.priority
    }
  }
  editTitle.value = taskTitle!
  editDesc.value = taskDesc!
  editDueDate.value = format(taskDue!, "yyyy-MM-dd")!
  for (let priority of editPriorities) {
    if (+priority.value === taskPriority) {
      priority.setAttribute("checked", "")
    } else {
      priority.removeAttribute("checked")
    }
  }
  taskEditBtn.dataset.id = id
}
