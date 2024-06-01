import setupListeners from "./listeners"
import { addDays, format, sub } from "date-fns"
import { addNewList, addNewTask } from "./main"
import { renderExisting } from "./domRenderingUtils"
import { setCurrentList } from "./localStorageUtils"

document.addEventListener(
  "DOMContentLoaded",
  () => {
    if (!JSON.parse(localStorage.getItem("visited")!)) {
      addNewList("Sample")
      addNewTask(
        "Grocery shopping",
        "Buy fruits, vegetables, milk, and bread for the week.",
        `${sub(new Date(), { days: 2 })}`,
        1,
        true,
      )
      addNewTask("Pay bills", "Pay the electricity, internet, and water bills online.", `${new Date()}`, 0)
      addNewTask("Call Mom", "Catch up with Mom over the phone this evening.", `${new Date()}`, 1)
      addNewTask("Exercise", "Go for a 30-minute run in the park.", `${addDays(new Date(), 2)}`, 2)
      addNewTask(
        "Doctor's appointment",
        "Visit Dr. John Doe for a routine check-up at 3 PM",
        `${addDays(new Date(), 4)}`,
        1,
      )
    }
    const taskDue = document.querySelector(`#task_due`) as HTMLInputElement
    const editDue = document.querySelector("#edit_due") as HTMLInputElement
    taskDue.setAttribute("min", format(new Date(), "yyyy-MM-dd"))
    editDue.setAttribute("min", format(new Date(), "yyyy-MM-dd"))

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
