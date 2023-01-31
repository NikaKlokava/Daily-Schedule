let initialLocale;
let currentDate;

function initializeLocale() {
  initialLocale =
    navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language;
}

function getCurrentDate() {
  const date = new Date();
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleString(initialLocale, options);
}

function getCurrentTime() {
  const date = new Date();
  const options = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };
  return date.toLocaleString(initialLocale, options);
}

function handleDateHasChanged() {
  const dateToday = document.getElementById("date");
  dateToday.textContent = currentDate;
}

function addDateTimeListener() {
  initializeLocale();

  const date = document.getElementById("date");
  const time = document.getElementById("time");

  const tick = () => {
    time.innerHTML = getCurrentTime();
    date.innerHTML = getCurrentDate();
    const formattedDate = getCurrentDate();
    if (currentDate != formattedDate) {
      currentDate = formattedDate;
      handleDateHasChanged();
    }
  };

  tick();
  setInterval(tick, 900);
}

function onDOMContentLoaded() {
  addDateTimeListener();
}

document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
