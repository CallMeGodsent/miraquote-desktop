const MAX_WIDTH = 400;
const MAX_HEIGHT = 800;
const AUTO_REFRESH_INTERVAL = 60000; // 60 seconds (adjust as needed)

async function updateQuote() {
  const quoteElement = document.getElementById('quote');
  const authorElement = document.getElementById('author');
  const quote = await window.electronAPI.getRandomQuote();
  
  quoteElement.textContent = `"${quote.text}"`;
  authorElement.textContent = `- ${quote.author}`;

  // Reset scroll position
  document.querySelector('main').scrollTop = 0;

  // Adjust window size
  const mainElement = document.querySelector('main');
  const headerHeight = document.getElementById('app-header').offsetHeight;
  const padding = 40;
  
  // Calculate content height
  const contentHeight = quoteElement.offsetHeight + authorElement.offsetHeight + padding;
  
  // Set width and height within the maximum limits
  const width = Math.min(MAX_WIDTH, Math.max(300, mainElement.offsetWidth + padding));
  const height = Math.min(MAX_HEIGHT, contentHeight + headerHeight);
  
  window.electronAPI.setWindowSize(width, height);
}


function startAutoRefresh() {
  setInterval(updateQuote, AUTO_REFRESH_INTERVAL);
}

document.getElementById('settings-btn').addEventListener('click', () => {
  window.electronAPI.openSettings();
});


document.getElementById('reload-btn').addEventListener('click', updateQuote);
document.getElementById('minimize-btn').addEventListener('click', () => window.electronAPI.minimizeWindow());
document.getElementById('close-btn').addEventListener('click', () => window.electronAPI.closeWindow());



// Initial quote on load
updateQuote();

// Start auto-refresh
startAutoRefresh();