chrome.runtime.onInstalled.addListener(function() {
    chrome.action.disable();
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
      chrome.declarativeContent.onPageChanged.addRules([
        {
          conditions: [
            new chrome.declarativeContent.PageStateMatcher({
              pageUrl: { urlContains: 'tradingview.com/symbols/' },
            })
          ],
          actions: [ new chrome.declarativeContent.ShowAction() ]
        }
      ]);
    });
  });