chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && 
    (tab.url.includes("chat.openai.com") || tab.url.includes("chatgpt.com"))) {
    // When ChatGPT is loaded, inject the content script
    chrome.scripting.executeScript({
      target: {tabId: tabId},
      function: autoClickStayLoggedOutButton
    });
  }
});

function autoClickStayLoggedOutButton() {
  const observer = new MutationObserver((mutationsList, observer) => {
    const stayLoggedOutButton = document.querySelector('[id^="radix-\\:"] > div > div > a');

    if (stayLoggedOutButton) {
      stayLoggedOutButton.click();
      observer.disconnect();
    }
  });

  const config = { childList: true, subtree: true };
  observer.observe(document.body, config);

  // Stop observer after 10 seconds
  setTimeout(() => {
    observer.disconnect();
  }, 10000);
}