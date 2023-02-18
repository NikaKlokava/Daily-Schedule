function handlerAddGoalsIconClick(prevBlock) {
  const divGoalContainer = document.createElement("div");
  divGoalContainer.className = "goal-container";
  divGoalContainer.insertAdjacentHTML(
    "afterbegin",
    `<div class="goal-icon"></div>
         <input class="goal-name" type="text" spellcheck="false" placeholder="[enter goals name]">
         <div class="delete-goal"></div>`
  );
  prevBlock.before(divGoalContainer);

  const goalIconElems = document.getElementsByClassName("goal-icon");
  for (let elem of goalIconElems) {
    elem.onclick = () => {
      handlerGoalIconClick(elem);
    };
  }

  const deleteGoalIconElems = document.getElementsByClassName("delete-goal");
  for (let elem of deleteGoalIconElems) {
    elem.onclick = () => {
      handlerDeleteGoalIconClick(elem);
    };
  }
}

function handlerGoalIconClick(elem) {
  const goalContainerEl = elem.closest(".goal-container");
  goalContainerEl.classList.toggle("active");
}

function handlerDeleteGoalIconClick(elem) {
  const goalContainerEl = elem.closest(".goal-container");
  goalContainerEl.remove();
}

function onDOMContentLoaded() {
  const addGoalsIconEl = document.getElementById("icon-add-goals");
  addGoalsIconEl.onclick = () => {
    handlerAddGoalsIconClick(addGoalsIconEl);
  };
}

document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
