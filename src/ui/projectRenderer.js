export function projectContainer(project, onDeleteCallback, onClickCallback) {
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project-container");
    projectContainer.style.border = "1px solid black";
    projectContainer.style.padding = "10px";
    projectContainer.style.margin = "10px";
    projectContainer.style.borderRadius = "5px";

    const projectTitle = document.createElement("h2");
    projectTitle.textContent = project;

    const deleteProjectButton = document.createElement("button");
    deleteProjectButton.textContent = "Delete Project";

    deleteProjectButton.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent the click event from bubbling up to the projectContainer
        if (typeof onDeleteCallback === "function") {
            onDeleteCallback(project);
        }
        projectContainer.remove();
    });

    projectContainer.addEventListener("click", () => {
        if (typeof onClickCallback === "function") {
            onClickCallback(project);
        }
    });

    projectContainer.appendChild(projectTitle);
    projectContainer.appendChild(deleteProjectButton);

    return projectContainer;
}