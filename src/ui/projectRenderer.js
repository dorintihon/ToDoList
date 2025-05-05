export function projectContainer(project, onDeleteCallback, onClickCallback) {
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project-container");

    projectContainer.style.padding = "10px";
    projectContainer.style.margin = "10px";
    projectContainer.style.borderRadius = "5px";
    projectContainer.style.display = "grid";
    projectContainer.style.gridTemplateColumns = "1fr 75px";


    const projectTitle = document.createElement("h2");
    projectTitle.textContent = project;

    const deleteProjectButton = document.createElement("button");
    deleteProjectButton.classList.add("delete-project-button");
    deleteProjectButton.textContent = "Delete Project";
    deleteProjectButton.style.gridColumn = "2 / 3";
    deleteProjectButton.style.alignSelf = "center";
    deleteProjectButton.style.justifySelf = "center";

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

    projectContainer.addEventListener("mouseenter", () => {
        projectContainer.appendChild(deleteProjectButton);
        projectContainer.style.boxShadow = "0 10px 10px rgba(0, 0, 0, 0.3)";
    });

    projectContainer.addEventListener("mouseleave", () => {
        
        if (projectContainer.contains(deleteProjectButton)) {
            projectContainer.removeChild(deleteProjectButton);
            projectContainer.style.boxShadow = "none";
        }
    });

    projectContainer.appendChild(projectTitle);

    return projectContainer;
}