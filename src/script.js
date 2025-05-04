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
    projectNameInput.classList.add("project-name-input");

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
                projectNameInput.value = ""; // Clear the input field
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
    projectTitle.classList.add("project-title");

    const deleteProjectButton = document.createElement("button");
    deleteProjectButton.textContent = "Delete Project";

    deleteProjectButton.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent the click event from bubbling up to the project container
        const projectIndex = projects.findIndex(p => p.getProjectName() === name);
        if (projectIndex !== -1) {
            projects.splice(projectIndex, 1);
            projectContainer.remove();

            const mainContent = document.querySelector(".main");
            mainContent.innerHTML = "<h1>Select a project</h1>"; // Clear previous content
            

        }
    });

    projectContainer.addEventListener("click", () => {
        const projectName = projectTitle.textContent;

        projectMainContainer(projectName);
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
        const taskElement = taskContainer(task.getTaskName(), name);
        tasksList.appendChild(taskElement);
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
            const projectName = document.querySelector(".main h1").textContent.split(": ")[1];
            const project = projects.find(p => p.getProjectName() === projectName);
            // Check if the task already exists
            if (project.getProjectTasks().some(task => task.getTaskName() === taskName)) {
                alert("Task already exists in the project.");
                return;
            }
            const task = new Task(taskName, taskDescription, taskDueDate, taskPriority, projectName);
            project.addTask(task);
           

            const mainContent = document.querySelector(".main");
            mainContent.appendChild(taskContainer(taskName, projectName));

            container.remove();
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

function taskContainer(name, projectName) {
    const taskContainer = document.createElement("div");
    const project = projects.find(p => p.getProjectName() === projectName);
    taskContainer.classList.add("task-container");
    taskContainer.style.border = "1px solid black";
    taskContainer.style.padding = "10px";
    taskContainer.style.margin = "10px";
    taskContainer.style.borderRadius = "5px";

    

    const task = project.getProjectTasks().find(task => task.getTaskName() === name);

    const taskTitle = document.createElement("h2");
    taskTitle.textContent = task.getTaskName();

    const taskDescription = document.createElement("p");
    taskDescription.textContent = task.getTaskDescription();

    const taskDueDate = document.createElement("p");
    taskDueDate.textContent = `Due Date: ${task.getTaskDueDate()}`;

    const taskPriority = document.createElement("p");
    taskPriority.textContent = `Priority: ${task.getTaskPriority()}`;
    
    const roundDiv = document.createElement("div");
    roundDiv.classList.add("round");
    
    // Create checkbox
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    

    const checkBoxId = `checkbox-${projectName}-${name}`.replace(/\s+/g, '-').toLowerCase();
    checkBox.id = checkBoxId;
    
    checkBox.addEventListener("change", () => {
        if (checkBox.checked) {
            taskTitle.style.textDecoration = "line-through";
            taskTitle.style.color = "grey";
            task.setTaskCompleted(true);
        } else {
            taskTitle.style.textDecoration = "none";
            taskTitle.style.color = "black";
            task.setTaskCompleted(false);
        }
    });
    
    // Create label
    const label = document.createElement("label");
    label.setAttribute("for", checkBoxId);

    // if task completed, set checkbox to checked
    if (task.getTaskCompleted()) {
        checkBox.checked = true;
        taskTitle.style.textDecoration = "line-through";
        taskTitle.style.color = "grey";
    }
    
    // Append to .round container
    roundDiv.appendChild(checkBox);
    roundDiv.appendChild(label);
    
    
    


    const deleteTaskButton = document.createElement("button");
    deleteTaskButton.textContent = "Delete Task";

    deleteTaskButton.addEventListener("click", () => {
        const projectName = document.querySelector(".main h1").textContent.split(": ")[1];
        const project = projects.find(p => p.getProjectName() === projectName);
        const taskIndex = project.getProjectTasks().findIndex(task => task.getTaskName() === name);
        if (taskIndex !== -1) {
            project.getProjectTasks().splice(taskIndex, 1);
            taskContainer.remove();
        }
    });

    
    taskContainer.appendChild(taskTitle);
    taskContainer.appendChild(taskDescription);
    taskContainer.appendChild(taskDueDate);
    taskContainer.appendChild(taskPriority);
    taskContainer.appendChild(roundDiv);
    taskContainer.appendChild(deleteTaskButton);

    return taskContainer;
}

function loadTestData() {
    const project1 = new Project("Work");
    const project2 = new Project("Personal");

    const task1 = new Task("Send Email", "Email the client with project update", "2025-05-10", "High", "Work");
    const task2 = new Task("Prepare Report", "Draft Q2 report", "2025-05-12", "Medium", "Work");

    const task3 = new Task("Buy Groceries", "Get vegetables and milk", "2025-05-05", "Low", "Personal");
    const task4 = new Task("Call Mom", "Weekly check-in", "2025-05-06", "High", "Personal");

    project1.addTask(task1);
    project1.addTask(task2);

    project2.addTask(task3);
    project2.addTask(task4);

    projects.push(project1, project2);

    const projectList = document.querySelector("ul.project-list");

    [project1, project2].forEach(proj => {
        const projEl = projectContainer(proj.getProjectName());
        projectList.appendChild(projEl);
    });

    // Optionally load the first project into main content
    projectMainContainer("Work");
}




DisplayPage();
loadTestData();


  
  