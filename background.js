const sites = [
    'facebook',
    'youtube',
    'instagram',
    'tiktok',
    'netflix',
    'prime',
    'whatsapp',
    'telegram'
];

async function getCurrentTab() {
    const queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

const workerFunction = () => {
    getCurrentTab().then(tab => {
        if (!tab?.url) {
            return
        }

        const { url, favIconUrl } = tab;        
        const trackedSite = sites.find(site => url.includes(site));
        if (!trackedSite) {
            return;
        }

        chrome.storage.local.get([trackedSite], (response = {}) => {
            const newTime = (response[trackedSite]?.timeInSeconds || 0) + 1;
            console.log({ response });

            const infoToSave = {
                icon: favIconUrl,
                timeInSeconds: newTime
            };

            chrome.storage.local.set({ [trackedSite]: infoToSave });
        });
    });
};

setInterval(workerFunction, 1000);

