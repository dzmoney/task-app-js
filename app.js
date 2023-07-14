let form = document.getElementById("form");
let newTaskInput = document.getElementById("new-task-input");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let newTaskBtn = document.getElementById("new-task-btn");
let saveTaskButton = document.getElementById("save-task-btn");
let modalElement = document.getElementById("new-task-modal");

// Disable form submission on enter key press
form.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
  }
});

// FORM VALIDATION
form.addEventListener("submit", (event) => {
  event.preventDefault();
  formValidation();
});

saveTaskButton.addEventListener("click", (event) => {
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

// COLLECT DATA
let data = [];

let handleInput = () => {
  let newTask = newTaskInput.value.trim();
  data.push(newTask);

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
};
