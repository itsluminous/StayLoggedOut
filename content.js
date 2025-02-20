const observer = new MutationObserver((mutationsList, observer) => {
    const stayLoggedOutButton = document.querySelector('[id^="radix-\\:"] > div > div > a');
  
    if (stayLoggedOutButton) {
      stayLoggedOutButton.click();
      observer.disconnect();
    }
  });
  
  const config = { childList: true, subtree: true };
  observer.observe(document.body, config);
  
  // Stop observing after 10 seconds
  setTimeout(() => {
    observer.disconnect();
  }, 10000);