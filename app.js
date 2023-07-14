let form = document.getElementById("form");
let newTaskInput = document.getElementById("new-task-input");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let newTaskBtn = document.getElementById("new-task-btn");
let saveTaskButton = document.getElementById("save-task-btn");

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
  }
};
