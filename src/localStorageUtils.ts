import { List } from "./list"

let lists: List[]
let toParse = localStorage.getItem("lists")

if (toParse) {
  lists = JSON.parse(toParse)
} else {
  localStorage.setItem("lists", JSON.stringify([]))
  toParse = localStorage.getItem("lists")!
  lists = JSON.parse(toParse)
}

export function clearStorage() {
  localStorage.clear()
}

export function storeListInLS(list: List) {
  lists.push(list)
  localStorage.setItem("lists", JSON.stringify(lists))
}

export function deleteListFromLS() {
  const currentListID = JSON.parse(localStorage.getItem("currentList")!)

  for (let [index, list] of lists.entries()) {
    if (list[0].id === currentListID) lists.splice(index, 1)
  }
  localStorage.setItem("lists", JSON.stringify(lists))
}

export function retrieveListFromLS(name: string) {
  for (let list of lists) {
    if (list[0].name === name) return list
  }
}

export function retrieveAllListsFromLS() {
  return lists
}

export function setCurrentList(id?: string) {
  if (!localStorage.getItem("currentList")) {
    localStorage.setItem("currentList", JSON.stringify(lists[0][0].id))
  } else {
    for (let list of lists) {
      if (list[0].id === id) {
        localStorage.setItem("currentList", JSON.stringify(list[0].id))
        break
      }
    }
  }
}

export function getCurrentList() {
  const currentListID = JSON.parse(localStorage.getItem("currentList")!)
  for (let list of lists) {
    if (list[0].id === currentListID) {
      return list
    }
  }
}

export function editListNameInLS(name: string) {
  const currentListID = JSON.parse(localStorage.getItem("currentList")!)

  for (let list of lists) {
    if (list[0].id === currentListID) {
      list[0].name = name
      localStorage.setItem("lists", JSON.stringify(lists))
      break
    }
  }
}
