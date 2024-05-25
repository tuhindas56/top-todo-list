type Priorities = 0 | 1 | 2

export type TaskObject = {
  title: string
  description: string
  dueDate: string
  priority: Priorities
  completed?: boolean
}

export default class Task {
  title: string
  description: string
  dueDate: string
  _priority: Priorities
  completed: boolean

  constructor({ title, description, dueDate, priority, completed = false }: TaskObject) {
    this.title = title
    this.description = description
    this.dueDate = dueDate
    this._priority = priority
    this.completed = completed
  }
  set priority(value: Priorities) {
    if ([0, 1, 2].includes(value)) {
      this._priority = value
    }
    return
  }
  get priority() {
    return this._priority
  }

  toggleCompletion() {
    this.completed = !this.completed
  }
}
