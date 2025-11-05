const button = document.querySelector('button');

const fazAlgumaCoisa = (tab) => {
    console.log(tab.url);
}

async function handleButtonClick() {
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: fazAlgumaCoisa,
        args: [tab]
    })
}

button.addEventListener("click", handleButtonClick);