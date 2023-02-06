let taskName;
let hourTimeStart;
let minTimeStart;
let timeDuration = 0;

function handlerIconAddTaskClick() {
  const modalContainerEl = document.getElementById("modal-container");
  modalContainerEl.style.display = "flex";

  const iconAddTaskEl = document.getElementById("icon-add-task");
  iconAddTaskEl.style.display = "none";
}

function handlerIconCloseTaskClick() {
  const modalContainerEl = document.getElementById("modal-container");
  modalContainerEl.style.display = "none";

  const iconAddTaskEl = document.getElementById("icon-add-task");
  iconAddTaskEl.style.display = "";
}

function handlerUpdateTaskName() {
  const taskNameInputEl = document.getElementById("task-name-input");
  taskName = taskNameInputEl.value;
}

function handlerHoursInputClick(input) {
  const hoursContainer = document.getElementById("hours-container");
  hoursContainer.classList.toggle("active");

  if (hourTimeStart) {
    input.value = "";
    hourTimeStart = undefined;
  }
}

function handlerMinsInputClick(input) {
  const minsContainer = document.getElementById("mins-container");
  minsContainer.classList.toggle("active");

  if (minTimeStart) {
    input.value = "";
    minTimeStart = undefined;
  }
}

function handlerHourItemClick(event) {
  const hoursInputEl = document.getElementById("hours");
  hoursInputEl.value = event.target.innerHTML;
  hourTimeStart = hoursInputEl.value;

  const hoursContainer = document.getElementById("hours-container");
  if (event.target) {
    hoursContainer.classList.toggle("active");
  }
}

function handlerMinItemClick(event) {
  const minsInputEl = document.getElementById("mins");
  minsInputEl.value = event.target.innerHTML;
  minTimeStart = minsInputEl.value;

  const minsContainer = document.getElementById("mins-container");
  if (event.target) {
    minsContainer.classList.toggle("active");
  }
}

function handlerTimeDurationItemClick(event) {
  const timeDurationItems = document.getElementsByClassName("min-item");
  const ownDurationInputEl = document.getElementById("own-duration-input");

  for (let item of timeDurationItems) {
    if (event.target === item && !item.classList.contains("active")) {
      timeDuration = event.target.innerHTML;
      ownDurationInputEl.value = '';
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  
    if(event.target === item && !item.classList.contains("active")) {
      timeDuration = 0;
    }
  }
}

function handlerOwnDurationInputClick() {
  const ownDurationInputEl = document.getElementById("own-duration-input");
  timeDuration = ownDurationInputEl.value;

  const timeDurationItems = document.getElementsByClassName("min-item");
  handlerTimeDurationItemClick(timeDurationItems)
}

function bbb() {
  console.log(taskName, hourTimeStart, minTimeStart, timeDuration);
}

function onDOMContentLoaded() {
  // open / close
  const iconAddTaskEl = document.getElementById("icon-add-task");
  iconAddTaskEl.onclick = handlerIconAddTaskClick;

  const iconCancelEl = document.getElementById("icon-cancel");
  iconCancelEl.onclick = handlerIconCloseTaskClick;

  // add task name
  const taskNameInputEl = document.getElementById("task-name-input");
  taskNameInputEl.addEventListener("input", handlerUpdateTaskName);

  // select hours / mins
  const hoursInputEl = document.getElementById("hours");
  hoursInputEl.onclick = () => handlerHoursInputClick(hoursInputEl);

  const minsInputEl = document.getElementById("mins");
  minsInputEl.onclick = () => handlerMinsInputClick(minsInputEl);

  const hourItemEls = document.getElementsByClassName("hours-item");
  for (let item of hourItemEls) {
    item.onclick = () => handlerHourItemClick(event);
  }
  const minItemEls = document.getElementsByClassName("mins-item");
  for (let item of minItemEls) {
    item.onclick = () => handlerMinItemClick(event);
  }

  // choose time duration
  const timeDurationEls = document.getElementsByClassName("min-item");
  for (let item of timeDurationEls) {
    item.onclick = () => handlerTimeDurationItemClick(event);
  }

  // choose own time duration

  const ownDurationInputEl = document.getElementById("own-duration-input");
  ownDurationInputEl.addEventListener("input", handlerOwnDurationInputClick);

  // confirm changes
  const buttonConfirmEl = document.getElementById("button-confirm-changes");
  buttonConfirmEl.onclick = bbb;
}

document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
