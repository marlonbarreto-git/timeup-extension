const timeElement = document.getElementById("time");
const nameElement = document.getElementById("name");
const timerElement = document.getElementById("timer");


const updateTimeElements = () => {
    chrome.storage.local.get(["timer"], ({ timer = 0 }) => {
        timerElement.textContent = `The timer is at: ${timer} seconds`;
    })
    const currentTime = new Date().toLocaleTimeString();
    timeElement.textContent = `The time is: ${currentTime}`;
}

updateTimeElements();
setInterval(updateTimeElements, 1000);

chrome.storage.sync.get(["name"], res => {
    nameElement.textContent = `Your name is: ${res.name ?? "???"}`
})

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

startBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        isRunning: true,
    })
});

stopBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        isRunning: false,
    })
});

resetBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        timer: 0,
        isRunning: false,
    })
});