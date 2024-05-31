import setupListeners from "./listeners"
import { addDays, format } from "date-fns"
import { addNewList, addNewTask } from "./main"
import { renderExisting } from "./domRenderingUtils"
import { retrieveAllTasksFromCurrentList, setCurrentList, clearStorage } from "./localStorageUtils"

document.addEventListener(
  "DOMContentLoaded",
  () => {
    if (!JSON.parse(localStorage.getItem("visited")!)) {
      addNewList("Demo")
      addNewTask("second task", "fun", `${addDays(new Date(), 2)}`, 0)
      addNewTask("test task", "testing fn", `${new Date()}`, 1)
    }
    const taskDue = document.querySelector(`#task_due`) as HTMLInputElement
    taskDue.setAttribute("min", format(new Date(), "yyyy-MM-dd"))

    console.table(retrieveAllTasksFromCurrentList())
    localStorage.setItem("visited", JSON.stringify(true))
    setCurrentList()
    setupListeners()
    renderExisting()
  },
  { once: true },
)

console.log(
  "%c If found, please report bugs here: https://github.com/tuhindas56/top-todo-list/issues",
  `padding: 15px 0;
      font-family: system-ui;
      font-weight: 600;
      `,
)

document.querySelector(".resetdb")?.addEventListener("click", clearStorage)
