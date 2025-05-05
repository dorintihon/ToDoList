// taskRenderer.js
import { createCheckbox } from "./checkbox.js";

export function taskContainer(task, projectName, onDeleteCallback) {
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");
    taskContainer.style.border = "1px solid black";
    taskContainer.style.padding = "10px";
    taskContainer.style.margin = "10px";
    taskContainer.style.borderRadius = "5px";


    const taskTitle = document.createElement("h2");
    taskTitle.textContent = task.getTaskName();

    const taskDescription = document.createElement("p");
    taskDescription.textContent = task.getTaskDescription();

    const taskDueDate = document.createElement("p");
    taskDueDate.textContent = `Due Date: ${task.getTaskDueDate()}`;

    const taskPriority = document.createElement("p");
    taskPriority.textContent = `Priority: ${task.getTaskPriority()}`;
    
    // Create checkbox
    const checkBoxElement = createCheckbox(task, projectName, (completed) => {
        if (completed) {
            taskTitle.style.textDecoration = "line-through";
            taskTitle.style.color = "grey";
        } else {
            taskTitle.style.textDecoration = "none";
            taskTitle.style.color = "black";
        }
    });

    // if task completed, set checkbox to checked
    if (task.getTaskCompleted()) {
        taskTitle.style.textDecoration = "line-through";
        taskTitle.style.color = "grey";
    }
    
    const deleteTaskButton = document.createElement("button");
    deleteTaskButton.textContent = "Delete Task";

    deleteTaskButton.addEventListener("click", () => {
        if (typeof onDeleteCallback === "function") {
            onDeleteCallback(task);
        }
        taskContainer.remove();
    });

    
    taskContainer.appendChild(taskTitle);
    taskContainer.appendChild(taskDescription);
    taskContainer.appendChild(taskDueDate);
    taskContainer.appendChild(taskPriority);
    taskContainer.appendChild(checkBoxElement);
    taskContainer.appendChild(deleteTaskButton);

    return taskContainer;
}