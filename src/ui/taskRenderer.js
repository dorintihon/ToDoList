// taskRenderer.js
import { createCheckbox } from "./checkbox.js";

export function taskContainer(task, projectName, onDeleteCallback) {
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");
    taskContainer.style.display = "grid";
    taskContainer.style.gridTemplateColumns = "1fr 3fr 1fr";
    taskContainer.style.gridTemplateRows = "32px min-content 1fr";
    taskContainer.style.gap = "10px";
    taskContainer.style.padding = "10px";
    taskContainer.style.border = "1px solid black";
    taskContainer.style.borderRadius = "5px";


    const taskTitle = document.createElement("h2");
    taskTitle.textContent = task.getTaskName();
    taskTitle.style.gridColumn = "2 / 3";
    taskTitle.style.gridRow = "1 / 2";

    const taskDescription = document.createElement("p");
    taskDescription.textContent = task.getTaskDescription();
    taskDescription.style.gridColumn = "2 / 3";
    taskDescription.style.gridRow = "2 / 3";
    
    

    const taskDueDate = document.createElement("p");
    taskDueDate.textContent = `Due Date: ${task.getTaskDueDate()}`;
    taskDueDate.style.gridColumn = "2 / 3";
    taskDueDate.style.gridRow = "3 / 4";
    taskDueDate.style.color = "gray";
    

    const taskPriority = document.createElement("p");
    taskPriority.textContent = `${task.getTaskPriority()}`;
    taskPriority.style.gridColumn = "3 / 4";
    taskPriority.style.gridRow = "2 / span 3";
    taskPriority.style.border = "1px solid black";
    taskPriority.style.borderRadius = "15px";
    taskPriority.style.justifySelf = "center";
    taskPriority.style.padding = "5px 10px";

    if (task.getTaskPriority() === "High") {
        taskPriority.style.backgroundColor = "rgba(207, 206, 205, 0.69)";
        taskPriority.style.color = "rgba(255, 0, 0, 0.8)";
        taskPriority.style.borderColor = "rgba(255, 0, 0, 0.8)";
    }else if (task.getTaskPriority() === "Medium") {
        taskPriority.style.backgroundColor = "rgba(207, 206, 205, 0.69)";
        taskPriority.style.color = "rgba(255, 101, 0, 0.6)";
        taskPriority.style.borderColor = "rgba(255, 101, 0, 0.6)";
    } else if (task.getTaskPriority() === "Low") {
        taskPriority.style.backgroundColor = "rgba(207, 206, 205, 0.69)";
        taskPriority.style.color = "rgba(2, 150, 0, 1)";
        taskPriority.style.borderColor = "rgba(2, 150, 0, 1)";
        
    }

    
    
    // Create checkbox
    const checkBoxElement = createCheckbox(task, projectName, (completed) => {
        if (completed) {
            taskTitle.style.textDecoration = "line-through";
            taskTitle.style.color = "#dadada";
            taskPriority.style.color = "black";
            taskPriority.style.borderColor = "#dadada";
        } else {
            taskTitle.style.textDecoration = "none";
            taskTitle.style.color = "black";

        }
    });

    checkBoxElement.style.gridColumn = "1 / 2";
    checkBoxElement.style.gridRow = "1 / span 3";
    checkBoxElement.style.height = "28px";
    checkBoxElement.style.justifySelf = "center";

    // if task completed, set checkbox to checked
    if (task.getTaskCompleted()) {
        taskTitle.style.textDecoration = "line-through";
        taskTitle.style.color = "grey";
    }
    
    const deleteTaskButton = document.createElement("button");
    deleteTaskButton.classList.add("delete-task-button");
    deleteTaskButton.textContent = "Delete Task";
    deleteTaskButton.style.gridColumn = "3 / 4";
    deleteTaskButton.style.gridRow = "1 / 2";

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

// TODO: Implement this function to set the color of the task priority based on the task's priority level
function setTaskPriorityColor() {
    
}