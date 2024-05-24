export function openDialog(id: string) {
  const dialog = document.querySelector(`dialog#${id}_form`) as HTMLDialogElement
  dialog.showModal()
}

export function closeDialog(id: string) {
  const dialog = document.querySelector(`dialog#${id}_form`) as HTMLDialogElement
  dialog.close()
}

export function createListElement(index: number) {
  const newListElement = document.createElement("li") as HTMLLIElement
  newListElement.dataset.index = `${index}`
  return newListElement
}

export function createButtonElement(name: string) {
  const newButtonElement = document.createElement("button") as HTMLButtonElement
  newButtonElement.textContent = name
  return newButtonElement
}

export function assignClasses(element: HTMLElement, ...classes: string[]) {
  classes.forEach((item) => element.classList.add(item))
}

export function appendItem(parent: HTMLElement, child: HTMLElement) {
  parent.append(child)
}
