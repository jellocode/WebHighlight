document.getElementById('clear').addEventListener('click', () => {
    const url = window.location.href;
    chrome.storage.local.get({ highlights: {} }, (data) => {
      delete data.highlights[url];
      chrome.storage.local.set({ highlights: data.highlights }, () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: () => {
              const highlights = document.querySelectorAll('span[style="background-color: yellow;"]');
              highlights.forEach(span => {
                const parent = span.parentNode;
                while (span.firstChild) parent.insertBefore(span.firstChild, span);
                parent.removeChild(span);
              });
            }
          });
        });
      });
    });
  });
  