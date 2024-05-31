chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'saveHighlight') {
      const { url, highlights } = request;
      chrome.storage.local.get({ highlights: {} }, (data) => {
        data.highlights[url] = highlights;
        chrome.storage.local.set({ highlights: data.highlights }, () => {
          sendResponse({ status: 'success' });
        });
      });
      return true; // Keep the message channel open for sendResponse
    }
  });
  