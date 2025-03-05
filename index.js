"use strict";

const secondLabel = document.querySelector(".second");
const minuteLabel = document.querySelector(".minute");
const hourLabel = document.querySelector(".hour");
const stopBtn = document.querySelector(".stopBtn");
const startBtn = document.querySelector(".startBtn");
const resetBtn = document.querySelector(".resetBtn");

let interval;
let second = 0;
let minute = 0;
let hour = 0;
let isRunning = false; // Flag to check if the timer is running

// set timer
function setTimer() {
  if (second === 60) {
    second = 0;
    minute++;
    updateDOM(secondLabel, second);
    
    if (minute === 60) {
      minute = 0;
      hour++;
      updateDOM(minuteLabel, minute);
    }
  }

  second++;
  updateDOM(secondLabel, second);
}

// start timer
startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  
  if (!isRunning) {
    interval = setInterval(setTimer, 500);
    isRunning = true;
    stopBtn.disabled = false; // Enable stop button when starting
  }
});

const laps = [];

// stop timer
stopBtn.addEventListener("click", (e) => {
  e.preventDefault();
  
  if (isRunning) {
    stopBtn.disabled = true;
    clearInterval(interval);
    isRunning = false;
    
    const lapObject = {
      hr: hour,
      min: minute,
      sec: second,
    };
    
    laps.push(lapObject);
    
    renderLap();
  }
});

const lapContainer = document.querySelector(".lapContainer");

// render laps
function renderLap() {
  lapContainer.innerHTML = "";
  
  laps.forEach((lap, index) => {
    const html = `
        <p class="lap">lap ${index + 1} :<span>${timePadStart(lap.hr)} : ${timePadStart(lap.min)} : ${timePadStart(lap.sec)}</span></p>
      `;
    lapContainer.insertAdjacentHTML("afterbegin", html);
  });
}

function timePadStart(time) {
  return time.toString().padStart(2, "0");
}

function updateDOM(labelTimer, element) {
  labelTimer.textContent = timePadStart(element);
}


// reset timer
resetBtn.addEventListener("click", (e) => {
  e.preventDefault();

  clearInterval(interval);

  second = 0;
  minute = 0;
  hour = 0;
  isRunning = false; // Reset the isRunning flag
  laps.length = 0; // Clear the laps array

  updateDOM(minuteLabel, minute);
  updateDOM(hourLabel, hour);
  updateDOM(secondLabel, second);

  lapContainer.innerHTML = `
          <p class="lap">lap 1 :<span>00 : 00 : 00</span></p>
`;
});
