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
function handlerHourStartItemClick(event) {
  const hoursStartInputEl = document.getElementById("hours-start-input");
  hoursStartInputEl.value = event.target.innerHTML;
  hourTimeStart = hoursStartInputEl.value;

  const hoursStartContainer = document.getElementById("hours-start-container");
  if (event.target) {
    hoursStartContainer.classList.toggle("active");
  }
}
function handlerMinStartItemClick(event) {
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
function handlerHourEndItemClick(event) {
  const hoursEndInputEl = document.getElementById("hours-end-input");
  hoursEndInputEl.value = event.target.innerHTML;
  hourTimeEnd = hoursEndInputEl.value;

  const hoursEndContainer = document.getElementById("hours-end-container");
  if (event.target) {
    hoursEndContainer.classList.toggle("active");
  }
}
function handlerMinEndItemClick(event) {
  const minsEndInputEl = document.getElementById("mins-end-input");
  minsEndInputEl.value = event.target.innerHTML;
  minTimeEnd = minsEndInputEl.value;

  const minsEndContainer = document.getElementById("mins-end-container");
  if (event.target) {
    minsEndContainer.classList.toggle("active");
  }
}

// choose duration
function handlerTimeDurationItemClick(event) {
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

    // if (event.target === item && !item.classList.contains("active")) {
    //   timeDuration = 0;
    // }
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
  console.log(localStorage);
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
      let divContentContainer = document.createElement("div");
      divContentContainer.className = "content-container";
      prevBlock.before(divContentContainer);
      console.log({ hourTimeStart, minTimeStart, hourTimeEnd, minTimeEnd });
      divContentContainer.insertAdjacentHTML(
        "afterbegin",
        `<p class="task-duration">${hourTimeStart}:${minTimeStart} - ${hourTimeEnd}:${minTimeEnd}</p>
         <p class="task-name">${taskName}</p>
         <div class="progress">
          <div class="progress-status"></div>
          <div class="change-status"></div>
          <div class="time-status"></div>
          <div class="delete"></div>
        </div>`
      );
      handlerIconCloseTaskClick();
    }, 500);
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
    item.onclick = () => handlerHourStartItemClick(event);
  }
  const minStartItemEls = document.getElementsByClassName("min-start-item");
  for (let item of minStartItemEls) {
    item.onclick = () => handlerMinStartItemClick(event);
  }

  // choose time duration
  const timeDurationEls = document.getElementsByClassName("min-item");
  for (let item of timeDurationEls) {
    item.onclick = () => handlerTimeDurationItemClick(event);
  }

  // select hours / mins END
  const hoursEndInputEl = document.getElementById("hours-end-input");
  hoursEndInputEl.onclick = () => handlerHoursEndInputClick(hoursEndInputEl);

  const minsEndInputEl = document.getElementById("mins-end-input");
  minsEndInputEl.onclick = () => handlerMinsEndInputClick(minsEndInputEl);

  const hourEndItemEls = document.getElementsByClassName("hour-end-item");
  for (let item of hourEndItemEls) {
    item.onclick = () => handlerHourEndItemClick(event);
  }
  const minEndItemEls = document.getElementsByClassName("min-end-item");
  for (let item of minEndItemEls) {
    item.onclick = () => handlerMinEndItemClick(event);
  }

  // confirm changes
  const buttonConfirmEl = document.getElementById("button-confirm-changes");
  buttonConfirmEl.onclick = confirmChanges;
}

document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
