let taskName;
let hourTimeStart;
let minTimeStart;
let timeDuration = 0;
let hourTimeEnd;
let minTimeEnd;

// icon click
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

  resetEnteredData();
}

// takc name
function handlerUpdateTaskName() {
  const taskNameInputEl = document.getElementById("task-name-input");
  taskName = taskNameInputEl.value;
}

// start time click
function handlerHoursStartInputClick(input) {
  const hoursStartContainer = document.getElementById("hours-start-container");
  hoursStartContainer.classList.toggle("active");

  if (hourTimeStart) {
    input.value = "";
    hourTimeStart = undefined;
  }
  resetEndTimeInputValues();
  resetTimeDuration();
}
function handlerMinsStartInputClick(input) {
  const minsStartContainer = document.getElementById("mins-start-container");
  minsStartContainer.classList.toggle("active");

  if (minTimeStart) {
    input.value = "";
    minTimeStart = undefined;
  }
  resetEndTimeInputValues();
  resetTimeDuration();
}
function handlerHourStartItemClick() {
  const hoursStartInputEl = document.getElementById("hours-start-input");
  hoursStartInputEl.value = event.target.innerHTML;
  hourTimeStart = hoursStartInputEl.value;

  const hoursStartContainer = document.getElementById("hours-start-container");
  if (event.target) {
    hoursStartContainer.classList.toggle("active");
  }
}
function handlerMinStartItemClick() {
  const minsStartInputEl = document.getElementById("mins-start-input");
  minsStartInputEl.value = event.target.innerHTML;
  minTimeStart = minsStartInputEl.value;

  const minsStartContainer = document.getElementById("mins-start-container");
  if (event.target) {
    minsStartContainer.classList.toggle("active");
  }
}

// end time click
function handlerHoursEndInputClick(input) {
  const hoursEndContainer = document.getElementById("hours-end-container");

  if (!hourTimeStart || !minTimeStart) {
    showErrorOfTimeSelecting();
  } else {
    hoursEndContainer.classList.toggle("active");
  }

  if (hourTimeEnd) {
    input.value = "";
    hourTimeEnd = undefined;
  }
}
function handlerMinsEndInputClick(input) {
  const minsEndContainer = document.getElementById("mins-end-container");
  if (!hourTimeStart || !minTimeStart) {
    showErrorOfTimeSelecting();
  } else {
    minsEndContainer.classList.toggle("active");
  }

  if (minTimeEnd) {
    input.value = "";
    minTimeEnd = undefined;
  }
  resetTimeDuration();
}
function handlerHourEndItemClick() {
  const hoursEndInputEl = document.getElementById("hours-end-input");
  hoursEndInputEl.value = event.target.innerHTML;
  hourTimeEnd = hoursEndInputEl.value;

  const hoursEndContainer = document.getElementById("hours-end-container");
  if (event.target) {
    hoursEndContainer.classList.toggle("active");
  }
}
function handlerMinEndItemClick() {
  const minsEndInputEl = document.getElementById("mins-end-input");
  minsEndInputEl.value = event.target.innerHTML;
  minTimeEnd = minsEndInputEl.value;

  const minsEndContainer = document.getElementById("mins-end-container");
  if (event.target) {
    minsEndContainer.classList.toggle("active");
  }
}

// choose duration
function handlerTimeDurationItemClick() {
  const timeDurationItems = document.getElementsByClassName("min-item");
  const hoursEndInputEl = document.getElementById("hours-end-input");
  const minsEndInputEl = document.getElementById("mins-end-input");

  for (let item of timeDurationItems) {
    if (event.target === item && !item.classList.contains("active")) {
      item.classList.add("active");
      timeDuration = event.target.innerHTML;

      if (!hourTimeStart || !minTimeStart) {
        showErrorOfTimeSelecting();
      } else {
        hourTimeEnd = parseInt(hourTimeStart);
        hoursEndInputEl.value = hourTimeEnd;

        minTimeEnd = parseInt(timeDuration) + parseInt(minTimeStart);
        minsEndInputEl.value = minTimeEnd;

        if (minTimeEnd >= 60) {
          minTimeEnd -= 60;
          hourTimeEnd += 1;
          hoursEndInputEl.value = hourTimeEnd;
          minsEndInputEl.value = minTimeEnd;
        }

        if (hourTimeEnd < 10) {
          hourTimeEnd = "0" + hourTimeEnd;
          hoursEndInputEl.value = hourTimeEnd;
        }

        if (minTimeEnd < 10) {
          minTimeEnd = "0" + minTimeEnd;
          minsEndInputEl.value = minTimeEnd;
        }
      }
    } else {
      item.classList.remove("active");
    }

  }
}

//reset values
function resetTaskNameInputValue() {
  const taskNameInputEl = document.getElementById("task-name-input");
  taskNameInputEl.value = "";
  taskName = undefined;
}
function resetStartTimeInputValues() {
  const hoursStartInputEl = document.getElementById("hours-start-input");
  hoursStartInputEl.value = "";

  const minsStartInputEl = document.getElementById("mins-start-input");
  minsStartInputEl.value = "";

  hourTimeStart = undefined;
  minTimeStart = undefined;
}
function resetEndTimeInputValues() {
  const hoursEndInputEl = document.getElementById("hours-end-input");
  hoursEndInputEl.value = "";

  const minsEndInputEl = document.getElementById("mins-end-input");
  minsEndInputEl.value = "";

  hourTimeEnd = undefined;
  minTimeEnd = undefined;
}
function resetTimeDuration() {
  const timeDurationItems = document.getElementsByClassName("min-item");
  for (let item of timeDurationItems) {
    item.classList.remove("active");
  }
  timeDuration = 0;
}

// reset data
function resetEnteredData() {
  resetTaskNameInputValue();
  resetStartTimeInputValues();
  resetTimeDuration();
  resetEndTimeInputValues();
}

// error
function showErrorOfTimeSelecting() {
  const errElem = document.querySelector(".error");
  setTimeout(() => {
    errElem.classList.add("active");
    errElem.innerHTML = "Enter time start!";
  }, 0);
  setTimeout(() => {
    errElem.classList.remove("active");
  }, 1500);
}

function showErrorOfConfirmChanges() {
  const errElem = document.querySelector(".error");
  setTimeout(() => {
    errElem.classList.add("active");
    errElem.innerHTML = "Enter all fields!";
  }, 0);
  setTimeout(() => {
    errElem.classList.remove("active");
  }, 2000);
}

//confirm changes
function confirmChanges() {
  const prevBlock = document.querySelector(".modal-container");
  if (
    !taskName ||
    !hourTimeStart ||
    !minTimeStart ||
    !hourTimeEnd ||
    !minTimeEnd
  ) {
    showErrorOfConfirmChanges();
  } else {
    setTimeout(() => {
      const divContentContainer = document.createElement("div");
      divContentContainer.className = "content-container";
      prevBlock.before(divContentContainer);
      divContentContainer.insertAdjacentHTML(
        "afterbegin",
        `<p class="task-duration">${hourTimeStart}:${minTimeStart} - ${hourTimeEnd}:${minTimeEnd}</p>
         <p class="task-name">${taskName}</p>
         <div class="progress-bar">
          <div class="done" title="done"></div>
          <div class="move-to-top" title="move to top"></div>
          <div class="return" title="return"></div>
          <div class="start-now" title="start now!"></div>
          <div class="delete-task" title="delete"></div>
        </div>`
      );
      handlerIconCloseTaskClick();
    }, 500);
    setTimeout(() => {
      updateProgressBarElements();
    }, 800); // file progress-bar.js
  }
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

  // select hours / mins START
  const hoursStartInputEl = document.getElementById("hours-start-input");
  hoursStartInputEl.onclick = () =>
    handlerHoursStartInputClick(hoursStartInputEl);

  const minsStartInputEl = document.getElementById("mins-start-input");
  minsStartInputEl.onclick = () => handlerMinsStartInputClick(minsStartInputEl);

  const hourStartItemEls = document.getElementsByClassName("hour-start-item");
  for (let item of hourStartItemEls) {
    item.onclick = handlerHourStartItemClick;
  }
  const minStartItemEls = document.getElementsByClassName("min-start-item");
  for (let item of minStartItemEls) {
    item.onclick = handlerMinStartItemClick;
  }

  // choose time duration
  const timeDurationEls = document.getElementsByClassName("min-item");
  for (let item of timeDurationEls) {
    item.onclick = handlerTimeDurationItemClick;
  }

  // select hours / mins END
  const hoursEndInputEl = document.getElementById("hours-end-input");
  hoursEndInputEl.onclick = () => handlerHoursEndInputClick(hoursEndInputEl);

  const minsEndInputEl = document.getElementById("mins-end-input");
  minsEndInputEl.onclick = () => handlerMinsEndInputClick(minsEndInputEl);

  const hourEndItemEls = document.getElementsByClassName("hour-end-item");
  for (let item of hourEndItemEls) {
    item.onclick =  handlerHourEndItemClick;
  }
  const minEndItemEls = document.getElementsByClassName("min-end-item");
  for (let item of minEndItemEls) {
    item.onclick =  handlerMinEndItemClick;
  }

  // confirm changes
  const buttonConfirmEl = document.getElementById("button-confirm-changes");
  buttonConfirmEl.onclick = confirmChanges;
}

document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
