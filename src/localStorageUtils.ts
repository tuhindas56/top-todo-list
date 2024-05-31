import Task from "./task"
import { List } from "./list"
import { format, isAfter, isBefore } from "date-fns"

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

export function storeListInLS(newList: List) {
  const toSplice = lists.findIndex((value) => newList[0].id === value[0].id)
  if (toSplice === -1) {
    lists.push(newList)
  } else {
    lists.splice(toSplice, 1)
    lists.push(newList)
  }
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

function sortTasks(tasks: Task[], sortType?: string) {
  let currentDate = format(new Date(), "dd MMMM yyyy")
  let sortedTasks
  if (sortType === "today") {
    sortedTasks = tasks.filter((task) => task.dueDate === currentDate)
  } else if (sortType === "upcoming") {
    sortedTasks = tasks.filter((task) => isAfter(task.dueDate, currentDate))
  } else if (sortType === "completed") {
    sortedTasks = tasks.filter((task) => task.completed)
  } else {
    sortedTasks = tasks.sort((a, b) => {
      if (isBefore(b.dueDate, a.dueDate)) {
        return 1
      } else {
        return -1
      }
    })
  }
  return sortedTasks
}

export function retrieveAllTasksFromCurrentList(sortType?: string) {
  const currentListID = getCurrentList()![0].id
  for (let list of lists) {
    if (list[0].id === currentListID) {
      let tasks = list.slice(1) as Task[]
      let sortedTasks = sortTasks(tasks, sortType) as Task[]
      for (let task of sortedTasks) {
        Object.setPrototypeOf(task, Task.prototype)
      }
      return sortedTasks as Task[]
    }
  }
}

export function deleteTaskFromLS(id: string) {
  const currentListID = getCurrentList()![0].id
  for (let list of lists) {
    if (list[0].id === currentListID) {
      for (let [index, task] of list.entries()) {
        if (task.id === id) {
          list.splice(index, 1)
          localStorage.setItem("lists", JSON.stringify(lists))
          break
        }
      }
    }
  }
}
