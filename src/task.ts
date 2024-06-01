export type Priorities = 0 | 1 | 2

type TaskObject = {
  title: string
  description: string
  dueDate: string
  priority: Priorities
  completed?: boolean
}

import generate from "./random"
import { format } from "date-fns"

export default class Task {
  title: string
  description: string
  dueDate: string
  _priority: Priorities
  completed?: boolean
  _id: string

  constructor({ title, description, dueDate, priority, completed }: TaskObject) {
    this.title = title
    this.description = description
    this.dueDate = format(dueDate, "dd MMMM yyyy")
    this._priority = priority
    this._id = generate()
    this.completed = completed || false
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
