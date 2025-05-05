export function createCheckbox(task, projectName, onChangeCallback) {
    //Checkbox container
    const roundDiv = document.createElement("div");
    roundDiv.classList.add("round");
    
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    
    const checkBoxId = `checkbox-${projectName}-${task.getTaskName()}`.replace(/\s+/g, '-').toLowerCase();
    checkBox.id = checkBoxId;
    
    // if task completed, set checkbox to checked
    if (task.getTaskCompleted()) {
        checkBox.checked = true;
    }

    // Create label
    const label = document.createElement("label");
    label.setAttribute("for", checkBoxId);
    
    checkBox.addEventListener("change", () => {
        const completed = checkBox.checked;
        task.setTaskCompleted(completed);
        if (typeof onChangeCallback === "function") {
            onChangeCallback(completed);
        }
        
    });
    
    // Append to .round container
    roundDiv.appendChild(checkBox);
    roundDiv.appendChild(label);
    
    return roundDiv;
}