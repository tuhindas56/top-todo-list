import { retrieveAllListsFromLS } from "./localStorageUtils"

const taskFormHeading = document.querySelector("#task_form_heading") as HTMLParagraphElement
const listFormHeading = document.querySelector("#list_form_heading") as HTMLParagraphElement
const createListButton = document.querySelector("#btn_create_list") as HTMLButtonElement
const changeListNameBtn = document.querySelector("#btn_change_list_name") as HTMLButtonElement

const listContainer = document.querySelector("#lists") as HTMLUListElement

export function openDialog(id: string, currentList?: string) {
  const dialog = document.querySelector(`dialog#${id}_form`) as HTMLDialogElement
  if (id === "task" && currentList) {
    taskFormHeading.textContent = `Add task to ${currentList}`
  }
  if (id === "list" && currentList) {
    listFormHeading.textContent = `Edit '${currentList}' list name`
    createListButton.classList.add("hidden")
    changeListNameBtn.classList.remove("hidden")
  }
  dialog.showModal()
}

export function closeDialog(id: string) {
  const dialog = document.querySelector(`dialog#${id}_form`) as HTMLDialogElement
  if (id === "task") {
    const taskFormHeading = document.querySelector("#task_form_heading") as HTMLParagraphElement
    taskFormHeading.textContent = `Add/Modify Task`
  }
  dialog.close()
  listFormHeading.textContent = `Create a task list`

  createListButton.classList.remove("hidden")
  changeListNameBtn.classList.add("hidden")
}

export function createListElement(id: string) {
  const newListElement = document.createElement("li") as HTMLLIElement
  newListElement.id = `list_${id}`
  return newListElement
}

export function createButtonElement(name: string, id: string) {
  const newButtonElement = document.createElement("button") as HTMLButtonElement
  newButtonElement.dataset.id = id
  newButtonElement.textContent = name
  return newButtonElement
}

export function assignClasses(element: HTMLElement, ...classes: string[]) {
  classes.forEach((item) => element.classList.add(item))
}

export function appendItem(parent: HTMLElement, child: HTMLElement) {
  parent.append(child)
}

export function createTaskElement(
  title: string,
  description: string,
  date: string,
  priority: number,
  id: string,
) {
  let priorityString: string = ""
  let color: string = ""
  switch (priority) {
    case 0:
      priorityString = "High"
      color = "text-red-500"
      break
    case 1:
      priorityString = "Normal"
      color = "text-blue-500"
      break
    case 2:
      priorityString = "Low"
      color = "text-slate-500"
      break
  }
  const newTask = document.createElement("li") as HTMLLIElement
  newTask.id = `task_${id}`
  newTask.innerHTML = `
  <div class="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200"></div>
  <time class="mb-1 text-sm font-normal leading-none text-gray-400">${date}</time>
  <p class="task_title text-lg font-semibold text-gray-900">${title}</p>
  <p class="task_desc mb-4 text-base font-normal text-gray-500">${description}</p>
  <span class="priority">
    <i class="fa-regular fa-flag mr-2 ${color}"></i>
    ${priorityString}
  </span>
  <div class="flex items-center gap-6">
    <button data-id = ${id} type="button" class="btn_edit_task my-6 rounded-lg border border-gray-200 bg-white px-4 py-1 text-sm font-medium hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none active:bg-gray-200 ">
     Edit
    </button>
    <button data-id = ${id} type="button" class="btn_delete_task my-6 rounded-lg border border-gray-200 bg-white px-4 py-1 text-sm font-medium hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:outline-none active:bg-gray-200 ">
     Delete
     </button>
    <label class="inline-flex cursor-pointer items-center" >
      <input data-id = ${id} type="checkbox" value="completed" class="peer sr-only task_completion_checkbox" />
      <div class="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full"></div>
      <span class="ms-3 select-none text-sm font-medium text-gray-900 completion_span" >Not complete</span>
    </label>
  </div> 
  `
  return newTask
}

export function renderListsToDOM(name: string, id: string) {
  if (!document.querySelector(`#list_${id}`)) {
    const newList = createListElement(id)
    const newButton = createButtonElement(name, id)
    assignClasses(newList, "mb-2", "hover:bg-slate-100")
    assignClasses(newButton, "w-full", "p-2", "text-left")
    appendItem(newList, newButton)
    appendItem(listContainer, newList)
  } else {
    return
  }
}

export function renderExisting() {
  const lists = retrieveAllListsFromLS()

  for (let list of lists) {
    renderListsToDOM(list[0].name, list[0].id)
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
