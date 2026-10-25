// Auto-update checker every 5 minutes when online
async function checkForAppUpdates() {
    if (!navigator.onLine) return; // Kama hakuna mtandao ruka
    try {
        const response = await fetch('./index.html?rand=' + Date.now(), { method: 'HEAD' });
        if (response.status === 200) {
            const currentETag = localStorage.getItem('uopeople_etag');
            const newETag = response.headers.get('ETag') || response.headers.get('Last-Modified');
            
            if (currentETag && newETag && currentETag !== newETag) {
                console.log("New version detected! Updating app cache...");
                localStorage.setItem('uopeople_etag', newETag);
                if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.getRegistration().then(reg => {
                        if (reg) reg.update();
                    });
                }
                // Notify user subtly or soft reload
                window.location.reload();
            } else if (!currentETag && newETag) {
                localStorage.setItem('uopeople_etag', newETag);
            }
        }
    } catch (e) {
        console.log("Update check skipped: offline or network error");
    }
}

// Run check every 5 minutes (300,000 milliseconds)
setInterval(checkForAppUpdates, 300000);
