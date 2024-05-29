import { List } from "./list"

export function clearStorage() {
  localStorage.clear()
}

export function storeListInLS(list: List) {
  const toParse = localStorage.getItem("lists")
  if (toParse) {
    const lists = JSON.parse(toParse)
    lists.push(list)
    localStorage.setItem("lists", JSON.stringify(lists))
  }
}

export function retrieveListFromLS(name: string) {
  const toParse = localStorage.getItem("lists")
  if (toParse) {
    const lists = JSON.parse(toParse)
    for (let index = 0; index < lists.length; index++) {
      if (lists[index][0].name === name) return lists[index]
    }
  }
}

export function deleteListFromLS(name: string) {
  const toParse = localStorage.getItem("lists")
  if (toParse) {
    const lists = JSON.parse(toParse)
    for (let index = 0; index < lists.length; index++) {
      if (lists[index][0].name === name) lists.splice(index, 1)
    }
    localStorage.setItem("lists", JSON.stringify(lists))
  }
}
