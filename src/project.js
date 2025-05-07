export class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  getProjectName() {
    return this.name;
  }

  getProjectTasks() {
    return this.tasks;
  }

  addTask(task) {
    // Check if the task is already in the project
    if (this.tasks.includes(task)) {
      console.log("Task already exists in the project.");
      return;
    }
    this.tasks.push(task);
  }

  removeTask(task) {
    const index = this.tasks.indexOf(task);
    if (index > -1) {
      this.tasks.splice(index, 1);
    }
  }

  printProject() {
    console.log(`Project: ${this.name}`);
    console.log("Tasks:");
    this.tasks.forEach((task) => {
      console.log(task.getTaskName());
      console.log(`Description: ${task.getTaskDescription()}`);
    });
  }
}
