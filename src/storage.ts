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

export function deleteListFromLS(name: string) {
  for (let [index, list] of lists.entries()) {
    if (list[0].name === name) lists.splice(index, 1)
  }
  localStorage.setItem("lists", JSON.stringify(lists))
}

export function retrieveListFromLS(name: string) {
  for (let list of lists) {
    if (list[0].name === name) return list
  }
}

export function retrieveAllLists() {
  return lists
}
