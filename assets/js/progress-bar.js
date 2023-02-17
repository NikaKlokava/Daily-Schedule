let startTimeOfTimer;
let endTimeOfTimer;

function updateProgressBarElements() {
  const doneButtonElems = document.getElementsByClassName("done");
  for (let elem of doneButtonElems) {
    elem.onclick = () => {
      handlerDoneButtonClick(elem);
    };
  }

  const moveToTopButtonElems = document.getElementsByClassName("move-to-top");
  for (let elem of moveToTopButtonElems) {
    elem.onclick = () => {
      console.log("here 1");
      handlerMoveToTopButtonClick(elem);
    };
  }

  const startNowButtonElems = document.getElementsByClassName("start-now");
  for (let elem of startNowButtonElems) {
    elem.onclick = () => {
      handlerStartNowButtonClick(elem);
    };
  }

  const deleteButtonElems = document.getElementsByClassName("delete-task");
  for (let elem of deleteButtonElems) {
    elem.onclick = () => {
      handlerDeleteButtonClick(elem);
    };
  }
}

function handlerDoneButtonClick(elem) {
  const contentContainerEl = elem.closest(".content-container");
  contentContainerEl.classList.toggle("active");
  elem.classList.toggle("active");
}

function handlerMoveToTopButtonClick(elem) {
  console.log("here 2");
  const topPriorytiesEl = document.getElementById("top-priorities");
  const contentContainerEl = elem.closest(".content-container");
  topPriorytiesEl.after(contentContainerEl);

  const returnButtonElems = document.getElementsByClassName("return");
  for (let elem of returnButtonElems) {
    elem.onclick = () => {
      console.log("here 3");
      handlerReturnButtonClick(elem);
    };
  }
}

function handlerReturnButtonClick(elem) {
  console.log("here 4");
  const modalContainerEl = document.getElementById("modal-container");
  const contentContainerEl = elem.closest(".content-container");
  modalContainerEl.before(contentContainerEl);
}

function handlerStartNowButtonClick(startNowButton) {
  const moveToTopButtonEl =
    startNowButton.previousElementSibling.previousElementSibling;
  moveToTopButtonEl.style.display = "none";

  startNowButton.classList.add("active");
  const contentContainerEl = startNowButton.closest(".content-container");

  const timerStartNow = document.createElement("p");
  timerStartNow.className = "timer-start-now";
  contentContainerEl.firstElementChild.style.display = "none";

  contentContainerEl.firstElementChild.after(timerStartNow);
  timerStartNow.insertAdjacentHTML(
    "afterbegin",
    `<span>00</span>:<span>00</span>:<span>00</span>`
  );

  startTimeOfTimer = getCurrentHourAndMinutes();

  setInterval(() => {
    timer(contentContainerEl);
  }, 900);

  startNowButton.onclick = () => {
    handlerStopTimerTask(startNowButton);
  };
}

function handlerStopTimerTask(elem) {
  const contentContainerEl = elem.closest(".content-container");
  const taskDurationEl = contentContainerEl.firstElementChild;
  const timerEl = taskDurationEl.nextElementSibling;
  const moveToTopButtonEl = elem.previousElementSibling.previousElementSibling;

  moveToTopButtonEl.style.display = "";
  elem.style.display = "none";
  taskDurationEl.style.display = "block";
  timerEl.style.display = "none";

  endTimeOfTimer = getCurrentHourAndMinutes();
  taskDurationEl.innerHTML = `${startTimeOfTimer} - ${endTimeOfTimer}`;
}

function timer(elem) {
  const timerStartNowEl = elem.firstElementChild.nextElementSibling;
  const hoursEl = timerStartNowEl.firstElementChild;
  const minutesEl = hoursEl.nextElementSibling;
  const secondsEl = timerStartNowEl.lastElementChild;

  let hour = parseInt(hoursEl.innerHTML);
  let min = parseInt(minutesEl.innerHTML);
  let sec = parseInt(secondsEl.innerHTML);

  secondsEl.innerHTML = sec + 1;

  if (secondsEl.innerHTML < 10) {
    secondsEl.innerHTML = "0" + secondsEl.innerHTML;
  } else if (secondsEl.innerHTML > 59) {
    minutesEl.innerHTML = min + 1;
    secondsEl.innerHTML = sec - 59;

    if (minutesEl.innerHTML < 10) {
      minutesEl.innerHTML = "0" + minutesEl.innerHTML;
    } else if (minutesEl.innerHTML > 59) {
      minutesEl.innerHTML = min - 59;
      hoursEl.innerHTML = hour + 1;

      if (hoursEl.innerHTML < 10) {
        hoursEl.innerHTML = "0" + hoursEl.innerHTML;
      }
    }

    if (secondsEl.innerHTML === "0") {
      secondsEl.innerHTML = "0" + secondsEl.innerHTML;
    }
    if (minutesEl.innerHTML === "0") {
      minutesEl.innerHTML = "0" + minutesEl.innerHTML;
    }
  }
}

function handlerDeleteButtonClick(elem) {
  const contentContainerEl = elem.closest(".content-container");
  contentContainerEl.remove();
  elem.classList.toggle("active");
}

function getCurrentHourAndMinutes() {
  const date = new Date();
  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };
  return date.toLocaleString(initialLocale, options);
}
