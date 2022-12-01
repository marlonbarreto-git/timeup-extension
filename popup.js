const trackedSites = [
    'facebook',
    'youtube',
    'instagram',
    'tiktok',
    'netflix',
    'prime',
    'whatsapp',
    'telegram'
];

const sites = document.getElementById("sites");

const updateTimeElements = () => {
    chrome.storage.local.get(trackedSites, response => {
        Object.keys(response).forEach(siteName => {
            const { icon, timeInSeconds } = response[siteName];
            const imgId = `${siteName}-img`;
            const timeId = `${siteName}-span`;
            const listItemId = `${siteName}-item`;

            const img = document.createElement('img');
            img.setAttribute('src', icon);
            img.setAttribute('id', imgId);

            const time = document.createElement('span');
            time.appendChild(document.createTextNode(`${parseInt(timeInSeconds / (60 * 60))} horas y ${timeInSeconds % (60 * 60)} minutos.`));
            time.setAttribute('id', timeId);

            document.getElementById(listItemId)?.remove();
            const listItem = document.createElement('li');
            listItem.setAttribute('id', listItemId);
            listItem.appendChild(img);
            listItem.appendChild(time);

            sites.appendChild(listItem);
        });  
    })
}

updateTimeElements();
setInterval(updateTimeElements, 1000);

/*
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
*/
