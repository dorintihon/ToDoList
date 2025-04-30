import "./styles.css";
import { Task } from "./task.js";
import { Project } from "./project.js";

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

const projects = [];




function DisplayPage(){
    const body = document.querySelector("body");
    body.classList.add("body");
    body.style.display = "grid";
    body.style.gridTemplateColumns = "1fr 3fr";
    body.style.gridTemplateRows = "1fr";
    body.style.height = "100vh";
    body.style.columnGap = "10px";
    

    body.appendChild(displaySidebar());
    body.appendChild(displayMainContent());
}

function displaySidebar(){
    const sidebar = document.createElement("div");
    sidebar.classList.add("sidebar");
    // sidebar.style.backgroundColor = "blue";
    sidebar.style.display = "grid";
    sidebar.style.gridTemplateColumns = "1fr 1fr";
    sidebar.style.gridTemplateRows = "100px 50px 3fr";
    sidebar.style.columnGap = "10px";

    const sidebarTitle = document.createElement("h1");
    sidebarTitle.textContent = "ToDo List";
    sidebarTitle.style.gridColumn = "1 / -1";
    
    const projectNameInput = document.createElement("input");
    projectNameInput.placeholder = "Project Name";

    const addProjectButton = document.createElement("button");
    addProjectButton.textContent = "Add Project";

    const projectListContainer = document.createElement("div");
    projectListContainer.classList.add("project-list");
    projectListContainer.style.border = "1px solid black";
    projectListContainer.style.gridColumn = "1 / -1";

    const projectListTitle = document.createElement("h2");
    projectListTitle.textContent = "Projects";

    const projectList = document.createElement("ul");
    projectList.classList.add("project-list");
    projectList.style.listStyleType = "none";
    projectList.style.padding = "0";
    projectList.style.margin = "0";
    
    addProjectButton.addEventListener("click", () => {
        const projectName = projectNameInput.value;
        if (projectName) {
            const project = new Project(projectName);
            // Check if the project already exists
            if (projects.some(p => p.getProjectName() === projectName)) {
                alert("Project already exists.");
                return;
            }
            projects.push(project);
            
            const projectElement = projectContainer(projectName);

            projectList.appendChild(projectElement);

            projectNameInput.value = ""; // Clear the input field
        } else {
            alert("Please enter a project name.");
        }
    });
    
    
    projectListContainer.appendChild(projectListTitle);
    projectListContainer.appendChild(projectList);




    sidebar.appendChild(sidebarTitle);
    sidebar.appendChild(projectNameInput);
    sidebar.appendChild(addProjectButton);
    sidebar.appendChild(projectListContainer);
    return sidebar;
}

function displayMainContent(){
    const main = document.createElement("div");
    main.classList.add("main");
    const mainTitle = document.createElement("h1");
    mainTitle.textContent = "Main Content";
    main.appendChild(mainTitle);
    // main.style.backgroundColor = "green";

    return main;
}

function projectContainer(name){
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project-container");
    projectContainer.style.border = "1px solid black";
    projectContainer.style.padding = "10px";
    projectContainer.style.margin = "10px";
    projectContainer.style.borderRadius = "5px";

    const projectTitle = document.createElement("h2");
    projectTitle.textContent = name;

    const deleteProjectButton = document.createElement("button");
    deleteProjectButton.textContent = "Delete Project";

    deleteProjectButton.addEventListener("click", () => {
        const projectIndex = projects.findIndex(p => p.getProjectName() === name);
        if (projectIndex !== -1) {
            projects.splice(projectIndex, 1);
            projectContainer.remove();
        }
    });

    projectContainer.addEventListener("click", () => {
        projectMainContainer(name);
    });



    projectContainer.appendChild(projectTitle);
    projectContainer.appendChild(deleteProjectButton);

    return projectContainer;
}

function projectMainContainer(name){
    const mainContent = document.querySelector(".main");
    mainContent.innerHTML = ""; // Clear previous content
    const projectTitleElement = document.createElement("h1");
    projectTitleElement.textContent = `Project: ${name}`;
    

    const addTaskButton = document.createElement("button");
    addTaskButton.textContent = "Add Task";

    addTaskButton.addEventListener("click", () => {
        const popup = taskInputContainer();
        document.body.appendChild(popup);
    });
    
    const tasksList = document.createElement("ul");
    tasksList.classList.add("task-list");
    tasksList.style.listStyleType = "none";
    tasksList.style.padding = "0";
    tasksList.style.margin = "0";

    const project = projects.find(p => p.getProjectName() === name);
    project.getProjectTasks().forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.textContent = task.getTaskName();
        tasksList.appendChild(taskItem);
    });

    
    mainContent.appendChild(projectTitleElement);
    mainContent.appendChild(addTaskButton);
    mainContent.appendChild(tasksList);

    return mainContent;


}

function taskInputContainer() {
    const container = document.createElement("div");
    container.classList.add("centered-container");

    container.style.position = "fixed"; // Stays in place
    container.style.top = "50%";
    container.style.left = "50%";
    container.style.transform = "translate(-50%, -50%)"; // Center it
    container.style.backgroundColor = "white";
    container.style.padding = "20px";
    container.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
    container.style.zIndex = "1000"; // Make sure it's on top
    container.style.borderRadius = "10px";

    const text = document.createElement("p");
    text.textContent = "Add a new task";
    
    const taskNameInput = document.createElement("input");
    taskNameInput.placeholder = "Task Name";

    const taskDescriptionInput = document.createElement("input");
    taskDescriptionInput.placeholder = "Task Description";

    const taskDueDateInput = document.createElement("input");
    taskDueDateInput.type = "date";
    taskDueDateInput.placeholder = "Due Date";

    const taskPriorityLabel = document.createElement("label");
    taskPriorityLabel.textContent = "Priority: ";
    const taskPrioritySelect = document.createElement("select");
    const priorities = ["Low", "Medium", "High"];
    priorities.forEach(priority => {
        const option = document.createElement("option");
        option.value = priority;
        option.textContent = priority;
        taskPrioritySelect.appendChild(option);
    });

    const sumbitButton = document.createElement("button");
    sumbitButton.textContent = "Submit";
    sumbitButton.addEventListener("click", () => {
        const taskName = taskNameInput.value;
        const taskDescription = taskDescriptionInput.value;
        const taskDueDate = taskDueDateInput.value;
        const taskPriority = taskPrioritySelect.value;

        if (taskName && taskDescription && taskDueDate && taskPriority) {
            const project = projects.find(p => p.getProjectName() === taskName);
            const newTask = new Task(taskName, taskDescription, taskDueDate, taskPriority, project);
            project.addTask(newTask);
            container.remove();
            projectMainContainer(project.getProjectName());
        } else {
            alert("Please fill in all fields.");
        }
    });



    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";

    closeButton.addEventListener("click", () => {
        container.remove();
    });

    
    container.appendChild(text);
    container.appendChild(taskNameInput);
    container.appendChild(taskDescriptionInput);
    container.appendChild(taskDueDateInput);
    container.appendChild(taskPriorityLabel);
    container.appendChild(taskPrioritySelect);
    container.appendChild(sumbitButton);
    container.appendChild(closeButton);


    return container;
}

function taskContainer(name){
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");
    taskContainer.style.border = "1px solid black";
    taskContainer.style.padding = "10px";
    taskContainer.style.margin = "10px";
    taskContainer.style.borderRadius = "5px";

    const taskTitle = document.createElement("h2");
    taskTitle.textContent = name;

    const deleteTaskButton = document.createElement("button");
    deleteTaskButton.textContent = "Delete Task";

    deleteTaskButton.addEventListener("click", () => {
        const projectIndex = projects.findIndex(p => p.getProjectName() === name);
        if (projectIndex !== -1) {
            projects.splice(projectIndex, 1);
            taskContainer.remove();
        }
    });

    
    taskContainer.appendChild(taskTitle);
    taskContainer.appendChild(deleteTaskButton);

    return taskContainer;
}





DisplayPage();



  
  