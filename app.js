let form = document.getElementById("form");
let newTaskInput = document.getElementById("new-task-input");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let taskList = document.getElementById("task-list");
let newTaskBtn = document.getElementById("new-task-btn");
let saveTaskButton = document.getElementById("save-task-btn");

//
// FORM VALIDATION

// Disable form submission on enter key press
form.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (newTaskInput.value === "") {
    console.log("failure");
    msg.textContent = "Task cannot be blank";
  } else {
    console.log("success");
    msg.textContent = "";
    handleInput();
  }
};

//
// COLLECT DATA
let data = "";

let handleInput = () => {
  let newTask = newTaskInput.value.trim();
  data = newTask;
  // save user input to local storage so it persists on reload
  localStorage.setItem("data", JSON.stringify(data));

  closeModal();
  createTask();

  // reset input to empty
  newTaskInput.value = "";
  // reset the data array so it doesn't resubmit previous inputs
  data = "";
};

let closeModal = () => {
  // make Save changes button close the modal
  saveTaskButton.setAttribute("data-bs-dismiss", "modal");
  saveTaskButton.click();

  (() => {
    saveTaskButton.setAttribute("data-bs-dismiss", "");
  })();
};

//
// CREATE TASKS
let createTask = () => {
  // retrieve data from local storage
  let savedData = localStorage.getItem("data");
  if (savedData) {
    let task = JSON.parse(savedData);

    // Create HTML elements for task & icons and append
    let taskElement = document.createElement("li");
    taskElement.classList.add("task");
    taskElement.setAttribute("task-completed", "false");

    let checkboxIcon = document.createElement("ion-icon");
    checkboxIcon.classList.add("checkbox-icon");
    checkboxIcon.setAttribute("name", "square-outline");

    let taskData = document.createElement("span");
    taskData.classList.add("task-display-data");
    taskData.textContent = task;

    let editIcon = document.createElement("ion-icon");
    editIcon.classList.add("edit-icon");
    editIcon.setAttribute("name", "create-outline");

    let deleteIcon = document.createElement("ion-icon");
    deleteIcon.classList.add("delete-icon");
    deleteIcon.setAttribute("name", "trash-outline");

    taskElement.appendChild(checkboxIcon);
    taskElement.appendChild(taskData);
    taskElement.appendChild(editIcon);
    taskElement.appendChild(deleteIcon);

    addTaskEventListeners(taskElement, checkboxIcon, editIcon, deleteIcon);

    taskList.appendChild(taskElement);
  }
};

let addTaskEventListeners = (
  taskElement,
  checkboxIcon,
  editIcon,
  deleteIcon
) => {
  checkboxIcon.addEventListener("click", () => {
    toggleTaskComplete(taskElement);
  });
};

let toggleTaskComplete = (taskElement) => {
  let checkboxIcon = taskElement.querySelector(".checkbox-icon");
  let taskData = taskElement.querySelector(".task-display-data");

  if (taskElement.getAttribute("task-completed") === "true") {
    checkboxIcon.setAttribute("name", "square-outline");
    taskData.style.textDecoration = "none";
    taskData.style.opacity = "1";
    taskElement.setAttribute("task-completed", "false");
  } else {
    checkboxIcon.setAttribute("name", "checkbox-outline");
    taskData.style.textDecoration = "line-through";
    taskData.style.opacity = "0.6";
    taskElement.setAttribute("task-completed", "true");
  }
};
