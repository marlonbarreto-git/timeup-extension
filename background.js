console.log("background script");

chrome.alarms.create({
    periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener(alarm => {
    chrome.storage.local.get(["timer", "isRunning"], res => {
        const timer = (res.timer ?? 0) + 1;
        
        const isRunning = res.isRunning ?? true;
        if (!isRunning) {
            return;
        }

        chrome.storage.local.set({ timer });
        chrome.action.setBadgeText({ text: `${timer}` });

        chrome.storage.sync.get(["notificationTime"], res => {
            const notificationTime = res.notificationTime ?? 1000;
            if (timer % notificationTime == 0) {
                this.registration.showNotification(
                    "TimeUp Notification",
                    { 
                        body: `${notificationTime} secods has passed!`,
                        icon: "icon.png"
                    }
                );
            }
        })
    })
})
