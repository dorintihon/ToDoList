export class Task {
  constructor(
    title,
    description,
    dueDate,
    priority,
    project,
    completed = false,
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
    this.completed = completed;
  }

  getTaskName() {
    return this.title;
  }

  getTaskDescription() {
    return this.description;
  }

  getTaskDueDate() {
    return this.dueDate;
  }

  getTaskPriority() {
    return this.priority;
  }

  getTaskProject() {
    return this.project;
  }

  getTaskCompleted() {
    return this.completed;
  }

  setTaskCompleted(completed) {
    this.completed = completed;
  }
}
