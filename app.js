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

  createTask();
};

//
// CREATE TASKS
let createTask = () => {
  taskList.innerHTML = "";

  // retrieve data from local storage
  let savedData = localStorage.getItem("data");
  console.log(savedData);
  if (savedData) {
    let task = JSON.parse(savedData);

    // Create HTML elements for each task and append them to the tasks div
    let taskElement = document.createElement("li");
    taskElement.classList.add("task");
    taskElement.textContent = task;
    taskList.appendChild(taskElement);
  }
};
