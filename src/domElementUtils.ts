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
  completed?: boolean,
) {
  const newTask = document.createElement("li") as HTMLLIElement
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
  let completionStatus
  let checkStatus
  let disableStatus
  let classes
  if (completed) {
    completionStatus = "Completed"
    checkStatus = "checked"
    disableStatus = "disabled"
    newTask.style.opacity = "0.5"
    classes = undefined
  } else {
    completionStatus = "Not completed"
    checkStatus = undefined
    disableStatus = undefined
    newTask.style.opacity = "1"
    classes = "hover:bg-gray-100 hover:text-blue-700 active:bg-gray-200"
  }
  newTask.id = `task_${id}`
  newTask.className = "mb-10 ms-4 fadeIn"
  newTask.innerHTML = `<div class="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200"></div><time class="mb-1 text-sm font-normal leading-none text-gray-400">${date}</time><p class="task_title text-lg font-semibold text-gray-900">${title}</p><p class="task_desc mb-4 text-base font-normal text-gray-500">${description}</p><span class="priority"><i class="fa-regular fa-flag mr-2 ${color}"></i>${priorityString}</span><div class="flex items-center gap-6"><button id="btn_edit_${id}" type="button" ${disableStatus} class="${classes} transition duration-75 my-6 rounded-lg border border-gray-200 bg-white px-4 py-1 text-sm font-medium focus:z-10 focus:outline-none" >Edit</button><button id="btn_del_${id}" type="button" class="transition duration-75 my-6 rounded-lg border border-gray-200 bg-white px-4 py-1 text-sm font-medium hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:outline-none active:bg-gray-200 ">Delete</button><label class="inline-flex cursor-pointer items-center" ><input id="checkbox_complete_${id}" type="checkbox" value="completed" class="peer sr-only" ${checkStatus} /><div class="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full"></div><span class="ms-3 select-none text-sm font-medium text-gray-900 completion_span" >${completionStatus}</span></label></div><hr />`
  return newTask
}
