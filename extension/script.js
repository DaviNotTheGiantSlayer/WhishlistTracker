const button = document.querySelector('button');

async function handleButtonClick() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  // Inject content script if not already present and send message
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['content.js']
    }, () => {
        chrome.tabs.sendMessage(tab.id, {action: "get_lis"}, (response) => {
        if (response && response.source) {
            console.log("LI's:", response.source);
            // You can use the HTML here, e.g., display it in the popup
            // document.getElementById('htmlContent').innerText = response.source.substring(0, 500) + "..."; // Show snippet
        } else {
            console.log("Could not retrieve HTML.");
        }
        });
    });
}

button.addEventListener("click", handleButtonClick);