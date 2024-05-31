import { getCurrentList, setCurrentList } from "./localStorageUtils"
import { renderExisting } from "./domRenderingUtils"

const listContainer = document.querySelector("#lists") as HTMLUListElement
const listTitle = document.querySelector("#list_title") as HTMLParagraphElement

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
  renderExisting()
})
listMutation.observe(listContainer, { childList: true })

function switchList(event: MouseEvent) {
  const target = event.target as HTMLButtonElement
  const targetID = target.dataset.id
  if (target.innerText === listTitle.innerText) return
  setCurrentList(targetID)
  const currentList = getCurrentList()
  if (currentList) {
    listTitle.innerText = currentList[0].name
    renderExisting()
  }
}
