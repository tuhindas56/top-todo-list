export function openDialog(id: string) {
  const dialog = document.querySelector(`dialog#${id}_form`) as HTMLDialogElement
  dialog.showModal()
}

export function closeDialog(id: string) {
  const dialog = document.querySelector(`dialog#${id}_form`) as HTMLDialogElement

  dialog.close()
}
