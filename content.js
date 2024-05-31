function highlightText(highlightedText) {
    const range = document.createRange();
    const textNode = document.body.firstChild;
    const startIndex = textNode.textContent.indexOf(highlightedText);
    if (startIndex === -1) return;
    
    range.setStart(textNode, startIndex);
    range.setEnd(textNode, startIndex + highlightedText.length);
    
    const highlightSpan = document.createElement('span');
    highlightSpan.style.backgroundColor = 'yellow';
    range.surroundContents(highlightSpan);
  }
  
  function restoreHighlights() {
    const url = window.location.href;
    chrome.storage.local.get({ highlights: {} }, (data) => {
      const pageHighlights = data.highlights[url];
      if (pageHighlights) {
        pageHighlights.forEach(highlightText);
      }
    });
  }
  
  function saveHighlights(highlights) {
    const url = window.location.href;
    chrome.runtime.sendMessage({ action: 'saveHighlight', url, highlights }, (response) => {
      if (response.status === 'success') {
        alert('Highlights saved!');
      }
    });
  }
  
  restoreHighlights();
  
  document.addEventListener('mouseup', () => {
    const selectedText = window.getSelection().toString();
    if (selectedText.length > 0) {
      highlightText(selectedText);
      saveHighlights([selectedText]);
    }
  });
  