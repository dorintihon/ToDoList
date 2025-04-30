import "./styles.css";
import { Task } from "./task.js";
import { Project } from "./project.js";

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

const Project1 = new Project("Project 1");

const task1 = new Task("Task 1", "Description 1", "2023-10-01", "High", Project);
const task2 = new Task("Task 2", "Description 2", "2023-10-02", "Medium", Project);

Project1.addTask(task1);
Project1.addTask(task2);
Project1.addTask(task1);
Project1.printProject();
console.log(Project1.getProjectTasks());

  
  