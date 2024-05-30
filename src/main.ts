import Task from "./task"
import {
  clearStorage,
  deleteListFromLS,
  editListNameInLS,
  getCurrentList,
  retrieveAllListsFromLS,
  retrieveListFromLS,
  setCurrentList,
  storeListInLS,
} from "./localStorageUtils"
import { createList, storeTaskInList } from "./list"
import { delListFromDOM, reRenderList, renderExisting, renderListsToDOM } from "./domUtils"
import setupListeners from "./listeners"
import { addDays, format, isBefore } from "date-fns"

import "./style.css"
import "flowbite"

document.querySelector(".resetdb")?.addEventListener("click", clearStorage)

// Cache DOM
const listContainer = document.querySelector("#lists") as HTMLUListElement
const listTitle = document.querySelector("#list_title") as HTMLParagraphElement
const taskContainer = document.querySelector("#tasks") as HTMLOListElement

const listMutation = new MutationObserver(() => {
  const buttons = document.querySelectorAll("#lists button") as NodeListOf<HTMLButtonElement>
  if (buttons.length === 1) {
    setCurrentList(buttons[0].dataset.id)
  }
  for (let button of buttons) {
    if (button) {
      button.addEventListener("click", switchList)
    }
  }
  const currentList = getCurrentList()
  if (currentList) {
    listTitle.innerText = currentList[0].name
  }
})
listMutation.observe(listContainer, { childList: true })

function switchList(event: MouseEvent) {
  const target = event.target as HTMLButtonElement
  const targetID = target.dataset.id

  // Prevent spamming
  if (target.innerText === listTitle.innerText) return

  setCurrentList(targetID)
  const currentList = getCurrentList()
  if (currentList) {
    listTitle.innerText = currentList[0].name
    renderExisting()
  }

  // lists.innerHTML = ""
  // const tasks = document.querySelector("#tasks") as HTMLOListElement
  // tasks.innerHTML = ""
  // currentList = targetName
}

export function addNewList(name: string) {
  if (!retrieveListFromLS(name)) {
    const newList = createList(name)
    storeListInLS(newList)
    renderListsToDOM(name, newList[0].id)
    setCurrentList(newList[0].id)

    renderExisting()
  }
}

export function deleteList() {
  delListFromDOM()
  deleteListFromLS()
}

// localStorage.removeItem(currentList)
// localStorage.setItem(newName, JSON.stringify(listToChange))
// currentList = listName.value
// listTitle.innerText = listName.value

// const listButton = document.querySelector(
//   `#lists #list_${listToChange.id} button`,
// ) as HTMLButtonElement
// listButton.innerText = listName.value

document.addEventListener(
  "DOMContentLoaded",
  () => {
    if (!JSON.parse(localStorage.getItem("visited")!)) {
      addNewList("Demo")
      addNewList("Ayaya")
    }

    localStorage.setItem("visited", JSON.stringify(true))
    setCurrentList()
    setupListeners()
    renderExisting()
  },
  { once: true },
)

document.addEventListener("listChanged", () => {
  listContainer.innerHTML = ""
  taskContainer.innerHTML = ""
  renderExisting()
})

console.log(
  "%c If found, please report bugs here: https://github.com/tuhindas56/top-todo-list/issues",
  `padding: 15px 0;
    font-family: system-ui;
    font-weight: 600;
    `,
)
