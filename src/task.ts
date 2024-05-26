type Priorities = 0 | 1 | 2

export type TaskObject = {
  title: string
  description: string
  dueDate: string
  priority: Priorities
  id: string
}

export default class Task {
  title: string
  description: string
  dueDate: string
  _priority: Priorities
  completed = false
  _id: string

  constructor({ title, description, dueDate, priority, id }: TaskObject) {
    this.title = title
    this.description = description
    this.dueDate = dueDate
    this._priority = priority
    this._id = id
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
  get id() {
    return this._id
  }

  toggleCompletion() {
    this.completed = !this.completed
  }
}
