function listFormHandling(event: MouseEvent) {
  event.preventDefault()
  if (["", null].includes(listName.value) || listName.value.length < 4) {
    listError.classList.remove("hidden")
    return
  }
  addNewListItem(listName.value)
  currentList = listName.value

  domUtils.closeDialog("list")
  domUtils.openDialog("task", currentList)
  const resetButton = document.querySelector('#list_form button[type="reset"]') as HTMLButtonElement
  resetButton.click()
}
