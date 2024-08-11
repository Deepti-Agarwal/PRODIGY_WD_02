// script.js

let startTime;
let elapsedTime = 0;
let timerInterval;

const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsList = document.getElementById('laps-list');

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedHH = hh.toString().padStart(2, "0");
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");

    return `${formattedHH}:${formattedMM}:${formattedSS}`;
}

function print(txt) {
    timeDisplay.innerHTML = txt;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function () {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 10);
    showButton("PAUSE");
}

function pause() {
    clearInterval(timerInterval);
    showButton("PLAY");
}

function reset() {
    clearInterval(timerInterval);
    print("00:00:00");
    elapsedTime = 0;
    lapsList.innerHTML = '';
    showButton("PLAY");
}

function lap() {
    let li = document.createElement("li");
    li.innerText = timeToString(elapsedTime);
    lapsList.appendChild(li);
}

function showButton(buttonKey) {
    if (buttonKey === "PLAY") {
        startBtn.style.display = "block";
        pauseBtn.style.display = "none";
    } else {
        startBtn.style.display = "none";
        pauseBtn.style.display = "block";
    }
}

startBtn.addEventListener("click", start);
pauseBtn.addEventListener("click", pause);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);

showButton("PLAY");
