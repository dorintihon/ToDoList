import "./styles.css";
import { Task } from "./task.js";
import { Project } from "./project.js";
import { taskContainer } from "./ui/taskRenderer.js";
import { projectContainer } from "./ui/projectRenderer.js";

const projects = [];

function DisplayPage() {
  const body = document.querySelector("body");
  body.classList.add("body");
  body.style.display = "grid";
  body.style.gridTemplateColumns = "1fr 3fr";
  body.style.gridTemplateRows = "1fr";
  body.style.height = "100vh";

  body.appendChild(displaySidebar());
  body.appendChild(displayMainContent());
}

function displaySidebar() {
  const sidebar = document.createElement("div");
  sidebar.classList.add("sidebar");
  sidebar.style.backgroundColor = "rgba(207, 206, 205, 0.69)";
  sidebar.style.display = "grid";
  sidebar.style.gridTemplateColumns = "1fr 1fr";
  sidebar.style.gridTemplateRows = "100px 50px 3fr";
  sidebar.style.columnGap = "10px";
  sidebar.style.padding = "10px";

  const sidebarTitle = document.createElement("h1");
  sidebarTitle.textContent = "ToDo List";
  sidebarTitle.style.gridColumn = "1 / -1";
  sidebarTitle.style.alignSelf = "center";

  const projectNameInput = document.createElement("input");
  projectNameInput.placeholder = "Project Name";
  projectNameInput.classList.add("project-name-input");
  projectNameInput.style.border = "none";
  projectNameInput.style.borderRadius = "5px";
  projectNameInput.style.paddingLeft = "10px";

  const addProjectButton = document.createElement("button");
  addProjectButton.textContent = "Add Project";

  const projectListContainer = document.createElement("div");
  projectListContainer.classList.add("project-list");
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
      if (projects.some((p) => p.getProjectName() === projectName)) {
        alert("Project already exists.");
        projectNameInput.value = ""; // Clear the input field
        return;
      }
      projects.push(project);

      const projectElement = projectContainer(
        projectName,
        () => deleteProject(projectName),
        () => selectProject(projectName),
      );

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

function displayMainContent() {
  const main = document.createElement("div");
  main.classList.add("main");
  const mainTitle = document.createElement("h1");
  mainTitle.textContent = "Main Content";
  main.appendChild(mainTitle);

  return main;
}

function projectMainContainer(name) {
  const mainContent = document.querySelector(".main");
  mainContent.innerHTML = ""; // Clear previous content
  mainContent.style.display = "grid";
  mainContent.style.rowGap = "10px";
  mainContent.style.padding = "10px";
  mainContent.style.gridTemplateColumns = "3fr 1fr";
  mainContent.style.gridTemplateRows = "100px min-content";
  const projectTitleElement = document.createElement("h1");
  projectTitleElement.textContent = `Project: ${name}`;
  projectTitleElement.style.alignSelf = "center";

  const addTaskButton = document.createElement("button");
  addTaskButton.textContent = "Add Task";
  addTaskButton.style.height = "50px";
  addTaskButton.style.alignSelf = "center";

  addTaskButton.addEventListener("click", () => {
    const popup = taskInputContainer();
    document.body.appendChild(popup);
  });

  const tasksList = document.createElement("ul");
  tasksList.classList.add("task-list");
  tasksList.style.listStyleType = "none";
  tasksList.style.padding = "0";
  tasksList.style.margin = "0";
  tasksList.style.display = "grid";
  tasksList.style.rowGap = "10px";
  tasksList.style.gridColumn = "1 / -1";

  const project = projects.find((p) => p.getProjectName() === name);
  project.getProjectTasks().forEach((task) => {
    const taskElement = taskContainer(task, name, () => {
      const index = project.getProjectTasks().findIndex((t) => t === task);
      if (index !== -1) {
        project.getProjectTasks().splice(index, 1);
      }
    });
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
  priorities.forEach((priority) => {
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
      const projectName = document
        .querySelector(".main h1")
        .textContent.split(": ")[1];
      const project = projects.find((p) => p.getProjectName() === projectName);
      // Check if the task already exists
      if (
        project
          .getProjectTasks()
          .some((task) => task.getTaskName() === taskName)
      ) {
        alert("Task already exists in the project.");
        return;
      }
      const task = new Task(
        taskName,
        taskDescription,
        taskDueDate,
        taskPriority,
        projectName,
      );
      project.addTask(task);

      projectMainContainer(projectName); // Refresh the project view

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

function loadTestData() {
  const project1 = new Project("Work");
  const project2 = new Project("Personal");

  const task1 = new Task(
    "Send Email",
    "Email the client with project update",
    "2025-05-10",
    "High",
    "Work",
  );
  const task2 = new Task(
    "Prepare Report",
    "Draft Q2 report",
    "2025-05-12",
    "Medium",
    "Work",
  );

  const task3 = new Task(
    "Buy Groceries",
    "Get vegetables and milk",
    "2025-05-05",
    "Low",
    "Personal",
  );
  const task4 = new Task(
    "Call Mom",
    "Weekly check-in",
    "2025-05-06",
    "High",
    "Personal",
  );

  project1.addTask(task1);
  project1.addTask(task2);

  project2.addTask(task3);
  project2.addTask(task4);

  projects.push(project1, project2);

  const projectList = document.querySelector("ul.project-list");

  [project1, project2].forEach((proj) => {
    const projName = proj.getProjectName();
    const projEl = projectContainer(
      projName,
      () => deleteProject(projName),
      () => selectProject(projName),
    );
    projectList.appendChild(projEl);
  });

  // Optionally load the first project into main content
  projectMainContainer("Work");
}

function deleteProject(projectName) {
  const projectIndex = projects.findIndex(
    (p) => p.getProjectName() === projectName,
  );
  if (projectIndex !== -1) {
    projects.splice(projectIndex, 1);
    const mainContent = document.querySelector(".main");
    mainContent.innerHTML = "<h1>Select a project</h1> "; // Clear previous content
  }
}

function selectProject(projectName) {
  projectMainContainer(projectName);
}

DisplayPage();
loadTestData();
